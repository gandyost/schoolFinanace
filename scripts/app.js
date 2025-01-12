// scripts/app.js
import { registerUser, loginUser, logoutUser, observeAuthState } from "./auth.js";
import { writeData, readData } from "./database.js";

// 초기 화면 및 버튼들
const authSelection = document.getElementById("auth-selection");
const showLoginBtn = document.getElementById("show-login-btn");
const showRegisterBtn = document.getElementById("show-register-btn");

// 로그인/회원가입 폼
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const cancelLoginBtn = document.getElementById("cancel-login-btn");
const cancelRegisterBtn = document.getElementById("cancel-register-btn");

// 대시보드
const dashboard = document.getElementById("dashboard");

// 회원가입 버튼 이벤트
document.getElementById("register-btn").addEventListener("click", async () => {
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


// 로그아웃 버튼 이벤트
document.getElementById("logout-btn").addEventListener("click", async () => {
    await logoutUser();
    alert("로그아웃 성공!");
});

// 로그인 상태 감지 및 대시보드 초기화
observeAuthState(async (user) => {
    if (user) {
        // 로그인 상태: 대시보드 표시
        authSelection.style.display = "none";
        dashboard.style.display = "block";

        // 사용자 이메일 표시
        document.getElementById("user-email").textContent = user.email;

        // Firebase에서 사용자 데이터 불러오기
        const userData = await readData(`users/${user.uid}`);
        if (userData) {
            document.getElementById("user-balance").textContent = userData.balance || 0;
            document.getElementById("user-salary").textContent = userData.salary || 0;
        }
    } else {
        // 로그아웃 상태: 초기 화면으로 돌아감
        authSelection.style.display = "block";
        dashboard.style.display = "none";
    }
});

export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 기본 사용자 데이터 저장
        await writeData(`users/${user.uid}`, {
            email: user.email,
            balance: 1000, // 초기 잔액
            salary: 2000, // 초기 월급
            createdAt: new Date().toISOString()
        });

        console.log("회원가입 성공 및 초기 데이터 저장 완료:", user);
    } catch (error) {
        console.error("회원가입 실패:", error.message);
    }
};

// 버튼 클릭 이벤트
showLoginBtn.addEventListener("click", () => {
    authSelection.style.display = "none";
    loginForm.style.display = "block";
});

showRegisterBtn.addEventListener("click", () => {
    authSelection.style.display = "none";
    registerForm.style.display = "block";
});

cancelLoginBtn.addEventListener("click", () => {
    loginForm.style.display = "none";
    authSelection.style.display = "block";
});

cancelRegisterBtn.addEventListener("click", () => {
    registerForm.style.display = "none";
    authSelection.style.display = "block";
});