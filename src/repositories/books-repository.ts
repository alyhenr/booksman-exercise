import { CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";

import { prisma } from "../database";

export async function getBooks() {
  const result = prisma.book.findMany();
  return result;
}

export async function getBook(id: number) {
  const result = prisma.book.findUnique({ where: { id } });
  return result;
}

export async function createBook(book: CreateBook) {
  const result = prisma.book.create({
    data: book,
  });

  return result;
}

export async function reviewBook(bookReview: CreateReview) {
  const { bookId } = bookReview;
  const result = prisma.book.update({
    where: { id: bookId },
    data: bookReview,
  });
  return result;
}
