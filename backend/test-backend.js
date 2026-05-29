async function run() {
    try {
        const user = {
            first_name: "test2",
            last_name: "test2",
            user_name: "wedfSAD", // existing username
            password: "password123",
            email_id: "test2@test.com",
            mobile_no: "1234567890",
            city: "city",
            state: "state",
            pin_code: "123456",
            status: 1
        };
        const res = await fetch("http://localhost:8000/user/createuser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        const data = await res.json();
        console.log("Status:", res.status);
        console.log("Response:", data);
    } catch (e) {
        console.log("Error:", e.message);
    }
}

run();
