// scripts/auth.js
import { auth } from "./firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { writeData } from "./database.js";

// 회원가입 함수
export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 기본 데이터 저장
        await writeData(`users/${user.uid}`, {
            email: user.email,
            balance: 1000, // 초기 잔액
            salary: 2000, // 월급
            createdAt: new Date().toISOString()
        });

        console.log("회원가입 및 초기 데이터 저장 성공:", user);
    } catch (error) {
        console.error("회원가입 실패:", error.message);
    }
};

// 로그인
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("로그인 성공:", userCredential.user);
    } catch (error) {
        console.error("로그인 실패:", error.message);
    }
};

// 로그아웃
export const logoutUser = async () => {
    try {
        await signOut(auth);
        console.log("로그아웃 성공");
    } catch (error) {
        console.error("로그아웃 실패:", error.message);
    }
};

// 로그인 상태 확인
export const observeAuthState = (callback) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("로그인된 사용자:", user.email);
            callback(user);
        } else {
            console.log("사용자가 로그아웃 상태입니다.");
            callback(null);
        }
    });
};