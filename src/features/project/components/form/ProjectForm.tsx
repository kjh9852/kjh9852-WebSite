import { useState } from 'react';
import {
  FormProvider,
  Controller,
  useWatch,
  type UseFormReturn,
  type SubmitHandler,
} from 'react-hook-form';

import { Input, Dropdown, Button, Loading } from '@/components/ui';
import { Tiptap, TiptapViewer } from '@/features/editor';
import useToggle from '@/hooks/useToggle';

import { type ProjectFormValues } from '../../schemas/project.schema';

import styles from './ProjectForm.module.scss';

interface ProjectFormProps {
  onUpdateProject: SubmitHandler<ProjectFormValues>;
  form: UseFormReturn<ProjectFormValues>;
  isPending: boolean;
  isEdit?: boolean;
}

const PROJECT_TYPE = [
  {
    label: '퍼블리싱',
    value: '퍼블리싱',
  },
  {
    label: '프론트엔드',
    value: '프론트엔드',
  },
] as const;

type ProjectCategoryType = (typeof PROJECT_TYPE)[number]['value'];

export default function ProjectForm({
  onUpdateProject,
  form,
  isPending,
  isEdit,
}: ProjectFormProps) {
  const [modalOpen, toggleModal, setModalOpen] = useToggle(false);
  const [isPreview, setIsPreview] = useState(false);

  const title = useWatch({
    control: form.control,
    name: 'title',
  });

  const description = useWatch({
    control: form.control,
    name: 'description',
  });

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPreview((prev) => !prev);
  };

  return (
    <div className={styles.projectFormContainer}>
      <FormProvider {...form}>
        <form
          className={styles.form}
          onSubmit={form.handleSubmit(onUpdateProject)}
        >
          {isPreview ? (
            <TiptapViewer title={title} description={description} />
          ) : (
            <Tiptap control={form.control} name="description">
              <div className={styles.projectHeader}>
                <Input
                  variant="unstyled"
                  inputClassName={styles.projectTitle}
                  className={styles.titleInput}
                  showErrorMessage={false}
                  type="text"
                  id="title"
                  placeHolder="제목을 입력해주세요"
                />
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field }) => (
                    <div className={styles.categoryDropdown}>
                      <Dropdown<ProjectCategoryType>
                        isOpen={modalOpen}
                        setOpen={setModalOpen}
                        dropdownList={PROJECT_TYPE}
                        positionStyle={{ top: '50px' }}
                        onSelect={(value) => {
                          if (!value) return;
                          field.onChange(value);
                        }}
                      >
                        <span
                          onClick={toggleModal}
                          className={styles.selectMenu}
                        >
                          {field.value || '타입선택'}
                        </span>
                      </Dropdown>
                    </div>
                  )}
                />
              </div>
            </Tiptap>
          )}

          <div className={styles.buttonContainer}>
            <div className={styles.buttonInner}>
              <Button
                type="button"
                variant="default"
                onButtonClick={handlePreview}
              >
                {isPreview ? '돌아가기' : '미리보기'}
              </Button>
              <Button
                disabled={
                  !form.formState.isValid ||
                  isPending ||
                  (isEdit ? !form.formState.isDirty : false)
                }
                type="submit"
                variant="submit"
              >
                {isPending ? <Loading size="small" /> : '완료'}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
