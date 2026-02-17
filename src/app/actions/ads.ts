"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAdvertisements() {
  return await prisma.advertisement.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getAdvertisement(id: string) {
  return await prisma.advertisement.findUnique({
    where: { id },
  });
}

export async function createAdvertisement(formData: FormData) {
  const title = formData.get("title") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const targetUrl = formData.get("targetUrl") as string;
  const position = formData.get("position") as string;
  const isActive = formData.get("isActive") === "true";

  if (!title || !imageUrl) {
    throw new Error("Judul dan Gambar wajib diisi");
  }

  await prisma.advertisement.create({
    data: {
      title,
      imageUrl,
      targetUrl,
      position,
      isActive,
    },
  });

  revalidatePath("/dashboard/ads");
  revalidatePath("/");
}

export async function updateAdvertisement(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const targetUrl = formData.get("targetUrl") as string;
  const position = formData.get("position") as string;
  const isActive = formData.get("isActive") === "true";

  if (!title || !imageUrl) {
    throw new Error("Judul dan Gambar wajib diisi");
  }

  await prisma.advertisement.update({
    where: { id },
    data: {
      title,
      imageUrl,
      targetUrl,
      position,
      isActive,
    },
  });

  revalidatePath("/dashboard/ads");
  revalidatePath("/");
}

export async function deleteAdvertisement(id: string) {
  await prisma.advertisement.delete({
    where: { id },
  });

  revalidatePath("/dashboard/ads");
  revalidatePath("/");
}

export async function toggleAdvertisementStatus(id: string, isActive: boolean) {
  await prisma.advertisement.update({
    where: { id },
    data: { isActive },
  });
  
  revalidatePath("/dashboard/ads");
  revalidatePath("/");
}
