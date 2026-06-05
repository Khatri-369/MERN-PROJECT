import fs from "fs";
import path from "path";

async function run() {
    console.log("=== Testing Multiple Photo Upload ===");

    // 1. Create two small mock images
    const img1Path = path.resolve("temp_img1.png");
    const img2Path = path.resolve("temp_img2.png");
    
    fs.writeFileSync(img1Path, "mock image content 1");
    fs.writeFileSync(img2Path, "mock image content 2");

    try {
        const formData = new FormData();
        
        // Append text fields
        formData.append("productname", "Test Multi Photo Product");
        formData.append("modelnumber", "TMP-999");
        formData.append("modelyear", "2026");
        formData.append("brandname", "Antigravity");
        formData.append("categoryname", "Electronics");
        formData.append("color", "Midnight Blue");
        formData.append("weight", "250g");
        formData.append("includedcomponent", "User Manual");
        formData.append("warranty", "2 Years");

        // Read files and append to formData
        const blob1 = new Blob([fs.readFileSync(img1Path)], { type: "image/png" });
        const blob2 = new Blob([fs.readFileSync(img2Path)], { type: "image/png" });
        
        formData.append("productphoto", blob1, "temp_img1.png");
        formData.append("productphoto", blob2, "temp_img2.png");

        // 2. Send request to backend
        console.log("Sending POST request to http://localhost:8000/product/createproduct...");
        const res = await fetch("http://localhost:8000/product/createproduct", {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        console.log("Response Status:", res.status);
        console.log("Response Data:", JSON.stringify(data, null, 2));

        if (res.status === 201) {
            console.log("\nSuccess! Product created successfully with multiple photos:");
            console.log(data.productphoto);
        } else {
            console.log("\nFailed to create product:", data.error || data.message);
        }

    } catch (e) {
        console.error("Test Error:", e.message);
    } finally {
        // 3. Clean up mock files
        if (fs.existsSync(img1Path)) fs.unlinkSync(img1Path);
        if (fs.existsSync(img2Path)) fs.unlinkSync(img2Path);
        console.log("Cleaned up temporary local mock files.");
    }
}

run();
