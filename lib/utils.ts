import { type ClassValue, clsx } from 'clsx';
import mongoose from 'mongoose';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function replaceIdDoc(doc: mongoose.mongo.BSON.Document | null) {
  if (!doc) {
    return null;
  }
  doc.id = doc._id.toString();
  delete doc._id;
  return doc;
}

export function replaceIdFromAccount(doc: mongoose.mongo.BSON.Document | null) {
  if (!doc) {
    return null;
  }
  doc.id = doc._id.toString();
  doc.userId = doc.userId.toString();
  delete doc._id;
  return doc;
}
