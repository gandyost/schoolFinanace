// scripts/database.js
import { database } from "./firebase.js";
import {
    ref,
    set,
    get,
    update,
    remove,
    child
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// 데이터 쓰기
export const writeData = async (path, data) => {
    try {
        await set(ref(database, path), data);
        console.log("데이터 저장 성공");
    } catch (error) {
        console.error("데이터 저장 실패:", error.message);
    }
};

// 데이터 읽기
export const readData = async (path) => {
    try {
        const snapshot = await get(child(ref(database), path));
        if (snapshot.exists()) {
            console.log("데이터 읽기 성공:", snapshot.val());
            return snapshot.val();
        } else {
            console.log("데이터 없음");
            return null;
        }
    } catch (error) {
        console.error("데이터 읽기 실패:", error.message);
    }
};

// 데이터 업데이트
export const updateData = async (path, data) => {
    try {
        await update(ref(database, path), data);
        console.log("데이터 업데이트 성공");
    } catch (error) {
        console.error("데이터 업데이트 실패:", error.message);
    }
};

// 데이터 삭제
export const deleteData = async (path) => {
    try {
        await remove(ref(database, path));
        console.log("데이터 삭제 성공");
    } catch (error) {
        console.error("데이터 삭제 실패:", error.message);
    }
};