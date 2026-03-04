import Header from '@/components/layout/header/Header';
import { Modal, ToastList } from '@/components/ui';
import LandigPage from '@/pages/LandingPage';
import { useModalStore } from '@/store/modalStore';

function App() {
  const { isOpen } = useModalStore();
  return (
    <>
      <Header />
      <LandigPage />
      {isOpen && <Modal />}
      <ToastList />
    </>
  );
}

export default App;
