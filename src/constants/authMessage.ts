export const FIREBASE_AUTH_MESSAGES: Record<string, string> = {
  // 로그인 관련 메세지
  'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
  'auth/invalid-credential': '입력하신 정보를 다시 확인해주세요.', // 범용 메시지
  'auth/too-many-requests': '잠시 후 다시 시도해주세요.',
  'auth/network-request-failed': '네트워크 연결이 원활하지 않습니다.',

  // 인증 유지 및 보안
  'auth/requires-recent-login': '보안을 위해 다시 로그인 후 시도해주세요.',
  'auth/user-token-expired': '인증 세션이 만료되었습니다. 다시 로그인해주세요.',
  'auth/user-not-found': '사용자 정보를 찾을 수 없습니다.',

  // 기타
  'auth/internal-error': '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
};
