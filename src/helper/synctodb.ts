

export default async function synctoDB(userId,cart){
    try {
       const res =  await fetch(`${(import.meta as any).env.VITE_API_URL}/api/cart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({userId, cart }),
        });
        const data = await res.json();
        if(data)console.log("synced success");

    }
    catch(err) { console.error("Failed to sync cart:", err); }
}