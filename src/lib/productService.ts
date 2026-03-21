import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit, onSnapshot, serverTimestamp, Timestamp
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
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

export function uploadProductImages(
  files: File[],
  onProgress?: (percent: number) => void
): Promise<string[]> {
  if (!storage) throw new Error('Firebase Storage not configured');
  
  return Promise.all(
    files.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const path = `products/${Date.now()}_${file.name}`;
          const storageRef = ref(storage!, path);
          const task = uploadBytesResumable(storageRef, file);

          task.on(
            'state_changed',
            (snap) => {
              const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
              onProgress?.(pct);
            },
            reject,
            async () => {
              const url = await getDownloadURL(task.snapshot.ref);
              resolve(url);
            }
          );
        })
    )
  );
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
