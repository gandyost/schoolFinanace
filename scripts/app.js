// scripts/app.js
import { registerUser, loginUser, logoutUser, observeAuthState } from "./auth.js";
import { writeData, readData } from "./database.js";

// 회원가입 버튼 이벤트
document.getElementById("register-btn").addEventListener("click", async () => {
     console.log("회원가입 버튼 클릭됨");
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    if (email && password) {
        await registerUser(email, password);
        alert("회원가입 성공! 이제 로그인하세요.");
    } else {
        alert("이메일과 비밀번호를 입력하세요.");
    }
});

// 로그인 버튼 이벤트
document.getElementById("login-btn").addEventListener("click", async () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    if (email && password) {
        await loginUser(email, password);
        alert("로그인 성공! 대시보드로 이동합니다.");
        // TODO: 로그인 후 대시보드로 이동
    } else {
        alert("이메일과 비밀번호를 입력하세요.");
    }
});

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

// 로그아웃 버튼 이벤트
document.getElementById("logout-btn").addEventListener("click", async () => {
    await logoutUser();
    alert("로그아웃 성공!");
});

// 회원가입 시 기본 데이터 저장
export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 기본 데이터 저장
        await writeData(`users/${user.uid}`, {
            email: user.email,
            balance: 0, // 초기 잔액
            createdAt: new Date().toISOString()
        });

        console.log("회원가입 및 데이터 저장 성공:", user);
    } catch (error) {
        console.error("회원가입 실패:", error.message);
    }
};
