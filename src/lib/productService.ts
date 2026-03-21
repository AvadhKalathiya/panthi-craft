import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit, onSnapshot, serverTimestamp, Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, hasConfig } from './firebase';
import type { Product } from '@/types/product';

const COLLECTION = 'products';

function getCol() {
  if (!db) throw new Error('Firebase not configured');
  return collection(db, COLLECTION);
}

export async function getAllProducts(): Promise<Product[]> {
  const q = query(getCol(), where('isActive', '==', true), orderBy('order', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  const q = query(getCol(), orderBy('order', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const q = query(getCol(), where('isActive', '==', true), where('isFeatured', '==', true), orderBy('order', 'asc'), limit(6));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
}

export async function getBestSellers(): Promise<Product[]> {
  const q = query(getCol(), where('isActive', '==', true), where('isBestSeller', '==', true), orderBy('order', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
}

export async function getProductById(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db!, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Product;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const q = query(getCol(), where('isActive', '==', true), where('category', '==', category), orderBy('order', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
}

export async function addProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(getCol(), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  const { id: _, createdAt, ...rest } = data as any;
  await updateDoc(doc(db!, COLLECTION, id), {
    ...rest,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db!, COLLECTION, id));
}

export async function toggleProductActive(id: string, currentStatus: boolean): Promise<void> {
  await updateDoc(doc(db!, COLLECTION, id), {
    isActive: !currentStatus,
    updatedAt: serverTimestamp(),
  });
}

export async function uploadProductImages(
  files: File[],
  onProgress?: (percent: number) => void
): Promise<string[]> {
  if (!storage) throw new Error('Firebase Storage not configured');
  
  const uploadPromises = files.map(async (file) => {
    try {
      console.log(`[Firebase] Starting upload for ${file.name}...`);
      
      // Clean filename for safety
      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const path = `products/${Date.now()}_${cleanName}`;
      const storageRef = ref(storage!, path);

      // We simulate progress for standard uploads so the UI still updates
      onProgress?.(25);
      
      // Using standard uploadBytes instead of resumable which can silently hang
      console.log(`[Firebase] Uploading to path: ${path}`);
      const snapshot = await uploadBytes(storageRef, file);
      console.log(`[Firebase] Upload successful! Getting URL...`);
      
      onProgress?.(75);
      
      const url = await getDownloadURL(snapshot.ref);
      console.log(`[Firebase] URL retrieved: ${url}`);
      
      onProgress?.(100);
      return url;
    } catch (error: any) {
      console.error(`[Firebase] Critical Upload Error handling ${file.name}:`, error);
      throw new Error(`Upload failed: ${error.message || 'Unknown network/rules error'}`);
    }
  });

  return Promise.all(uploadPromises);
}

export async function deleteProductImage(url: string): Promise<void> {
  if (!storage) return;
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch {
    // Image may already be deleted
  }
}

export function subscribeProducts(callback: (products: Product[]) => void) {
  const q = query(getCol(), orderBy('order', 'asc'));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() } as Product)));
  });
}

export { hasConfig };
