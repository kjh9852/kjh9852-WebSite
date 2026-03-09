import Header from '@/components/layout/header/Header';
import { Modal, ToastList } from '@/components/ui';
import LandingPage from '@/pages/LandingPage';
import { useModalStore } from '@/store/modalStore';

function App() {
  const { isOpen } = useModalStore();
  return (
    <>
      <Header />
      <LandingPage />
      {isOpen && <Modal />}
      <ToastList />
    </>
  );
}

export default App;
