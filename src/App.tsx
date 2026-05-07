import Header from '@/components/layout/header/Header';
import { Modal, ToastList } from '@/components/ui';
import { useAuthObserver } from '@/features/auth/hooks/useAuthObserver';
import ProjectSheet from '@/features/project/components/sheet/ProjectSheet';
import LandingPage from '@/pages/LandingPage';
import { useModalStore } from '@/store/modalStore';
import { useProjectStore } from '@/store/projectStore';

function App() {
  const { isOpen } = useModalStore();
  const { type: projectType, projectId } = useProjectStore();
  useAuthObserver();

  return (
    <>
      <Header />
      <LandingPage />
      <ToastList />
      {isOpen && <Modal />}
      {projectType && (
        <ProjectSheet projectId={projectType === 'add' ? null : projectId} />
      )}
    </>
  );
}

export default App;
