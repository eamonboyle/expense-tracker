import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { Item } from "../types";

export const fetchData = async () => {
    const docRef = query(collection(db, 'items'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(docRef);
    const items: Item[] = [];
    querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, name: doc.data().name, price: doc.data().price });
    });

    // order items by price
    items.sort((a, b) => a.price - b.price);

    const total = items.reduce((acc, item) => acc + item.price, 0);

    return { items, total };
}