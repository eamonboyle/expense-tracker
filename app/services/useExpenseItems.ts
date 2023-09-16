import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Item } from '../types';

export const useExpenseItems = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [total, setTotal] = useState(0);

    const fetchData = async () => {
        const docRef = query(collection(db, 'items'), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(docRef);
        const items: Item[] = [];
        querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, name: doc.data().name, price: doc.data().price });
        });

        const total = items.reduce((acc, item) => acc + item.price, 0);

        setItems(items);
        setTotal(total);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const addItem = async (newItem: Item) => {
        if (newItem.name === '' || newItem.price === 0) return;

        newItem.date = new Date();

        await addDoc(collection(db, 'items'), newItem);
        fetchData();
    }

    const deleteItem = async (id: string) => {
        await deleteDoc(doc(db, 'items', id));
        fetchData();
    }

    return { items, total, addItem, deleteItem };
}