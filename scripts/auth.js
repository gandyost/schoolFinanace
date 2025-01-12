// scripts/auth.js
import { auth } from "./firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// 회원가입 함수
export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("회원가입 성공:", userCredential.user);
        alert("회원가입이 완료되었습니다!");
    } catch (error) {
        console.error("회원가입 실패:", error.message);
        alert(`회원가입 실패: ${error.message}`);
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


// 사용자 상태 관찰
observeAuthState((user) => {
    if (user) {
        document.getElementById("auth-section").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    } else {
        document.getElementById("auth-section").style.display = "block";
        document.getElementById("dashboard").style.display = "none";
    }
});
