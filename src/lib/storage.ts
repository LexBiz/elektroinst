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

export async function getSubmissions(): Promise<ContactSubmission[]> {
  const rows = await readJson<ContactSubmission>(submissionsFile);
  return rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addSubmission(
  row: Omit<ContactSubmission, "id" | "createdAt">,
): Promise<ContactSubmission> {
  const rows = await getSubmissions();
  const entry: ContactSubmission = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...row,
  };
  rows.unshift(entry);
  await writeJson(submissionsFile, rows);
  return entry;
}

export async function removeSubmission(id: string) {
  const rows = await getSubmissions();
  const next = rows.filter((item) => item.id !== id);
  await writeJson(submissionsFile, next);
}

export async function getVacancies(): Promise<Vacancy[]> {
  const rows = await readJson<Vacancy>(vacanciesFile);
  return rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addVacancy(
  vacancy: Omit<Vacancy, "id" | "createdAt">,
): Promise<Vacancy> {
  const rows = await getVacancies();
  const entry: Vacancy = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...vacancy,
  };
  rows.unshift(entry);
  await writeJson(vacanciesFile, rows);
  return entry;
}

export async function removeVacancy(id: string) {
  const rows = await getVacancies();
  const next = rows.filter((item) => item.id !== id);
  await writeJson(vacanciesFile, next);
}

