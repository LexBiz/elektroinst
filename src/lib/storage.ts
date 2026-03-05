import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type ContactSubmission = {
  id: string;
  createdAt: string;
  locale: "cs" | "uk";
  fullName: string;
  email: string;
  phone: string;
  details: string;
};

export type Vacancy = {
  id: string;
  createdAt: string;
  titleCs: string;
  titleUk: string;
  type: string;
  location: string;
  descriptionCs: string;
  descriptionUk: string;
};

const dataDir = path.join(process.cwd(), "data");
const submissionsFile = path.join(dataDir, "submissions.json");
const vacanciesFile = path.join(dataDir, "vacancies.json");
const fileLocks = new Map<string, Promise<void>>();

async function ensureDataFiles() {
  await mkdir(dataDir, { recursive: true });

  for (const filePath of [submissionsFile, vacanciesFile]) {
    try {
      await readFile(filePath, "utf-8");
    } catch {
      await writeFile(filePath, "[]", "utf-8");
    }
  }
}

async function readJson<T>(filePath: string): Promise<T[]> {
  await ensureDataFiles();
  const raw = await readFile(filePath, "utf-8");
  try {
    const parsed = JSON.parse(raw) as T[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeJson<T>(filePath: string, data: T[]) {
  await ensureDataFiles();
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

async function withFileLock<T>(filePath: string, task: () => Promise<T>): Promise<T> {
  const prev = fileLocks.get(filePath) ?? Promise.resolve();
  let release!: () => void;
  const current = new Promise<void>((resolve) => {
    release = resolve;
  });
  fileLocks.set(filePath, prev.then(() => current));
  await prev;
  try {
    return await task();
  } finally {
    release();
    if (fileLocks.get(filePath) === current) {
      fileLocks.delete(filePath);
    }
  }
}

function normalizeSubmission(row: Partial<ContactSubmission>): ContactSubmission {
  const createdAt =
    typeof row.createdAt === "string" && !Number.isNaN(Date.parse(row.createdAt))
      ? row.createdAt
      : new Date().toISOString();
  return {
    id: typeof row.id === "string" && row.id ? row.id : randomUUID(),
    createdAt,
    locale: row.locale === "uk" ? "uk" : "cs",
    fullName: String(row.fullName ?? "").trim(),
    email: String(row.email ?? "").trim(),
    phone: String(row.phone ?? "").trim(),
    details: String(row.details ?? "").trim(),
  };
}

function normalizeVacancy(row: Partial<Vacancy>): Vacancy {
  const createdAt =
    typeof row.createdAt === "string" && !Number.isNaN(Date.parse(row.createdAt))
      ? row.createdAt
      : new Date().toISOString();
  return {
    id: typeof row.id === "string" && row.id ? row.id : randomUUID(),
    createdAt,
    titleCs: String(row.titleCs ?? "").trim(),
    titleUk: String(row.titleUk ?? "").trim(),
    type: String(row.type ?? "").trim(),
    location: String(row.location ?? "").trim(),
    descriptionCs: String(row.descriptionCs ?? "").trim(),
    descriptionUk: String(row.descriptionUk ?? "").trim(),
  };
}

export async function getSubmissions(): Promise<ContactSubmission[]> {
  const rows = await readJson<ContactSubmission>(submissionsFile);
  return rows
    .map((row) => normalizeSubmission(row))
    .filter((row) => row.fullName && row.email && row.phone && row.details)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addSubmission(
  row: Omit<ContactSubmission, "id" | "createdAt">,
): Promise<ContactSubmission> {
  return withFileLock(submissionsFile, async () => {
    const rows = (await readJson<ContactSubmission>(submissionsFile)).map((item) =>
      normalizeSubmission(item),
    );
    const entry = normalizeSubmission({
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...row,
    });
    rows.unshift(entry);
    await writeJson(submissionsFile, rows);
    return entry;
  });
}

export async function removeSubmission(id: string) {
  await withFileLock(submissionsFile, async () => {
    const rows = (await readJson<ContactSubmission>(submissionsFile)).map((item) =>
      normalizeSubmission(item),
    );
    const next = rows.filter((item) => item.id !== id);
    await writeJson(submissionsFile, next);
  });
}

export async function getVacancies(): Promise<Vacancy[]> {
  const rows = await readJson<Vacancy>(vacanciesFile);
  return rows
    .map((row) => normalizeVacancy(row))
    .filter((row) => row.titleCs || row.titleUk || row.descriptionCs || row.descriptionUk)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addVacancy(
  vacancy: Omit<Vacancy, "id" | "createdAt">,
): Promise<Vacancy> {
  return withFileLock(vacanciesFile, async () => {
    const rows = (await readJson<Vacancy>(vacanciesFile)).map((item) =>
      normalizeVacancy(item),
    );
    const entry = normalizeVacancy({
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...vacancy,
    });
    rows.unshift(entry);
    await writeJson(vacanciesFile, rows);
    return entry;
  });
}

export async function removeVacancy(id: string) {
  await withFileLock(vacanciesFile, async () => {
    const rows = (await readJson<Vacancy>(vacanciesFile)).map((item) =>
      normalizeVacancy(item),
    );
    const next = rows.filter((item) => item.id !== id);
    await writeJson(vacanciesFile, next);
  });
}

