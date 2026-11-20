import React, { useState } from 'react';
import {
  Controller,
  FormProvider,
  useWatch,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form';

import { Button, CloseIcon, Dropdown, Input, Loading } from '@/components/ui';
import { Tiptap, TiptapViewer } from '@/features/editor';
import useToggle from '@/hooks/useToggle';
import { useProjectStore } from '@/store/projectStore';

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
    label: '개인 프로젝트',
    value: '개인 프로젝트',
  },
  {
    label: '팀 프로젝트',
    value: '팀 프로젝트',
  },
] as const;

type ProjectCategoryType = (typeof PROJECT_TYPE)[number]['value'];

export default function ProjectForm({
  onUpdateProject,
  form,
  isPending,
  isEdit,
}: ProjectFormProps) {
  const closeProject = useProjectStore((state) => state.closeProject);
  const [menuOpen, toggleMenu, setMenuOpen] = useToggle(false);
  const [isPreview, setIsPreview] = useState(false);
  const [tagValue, setTagValue] = useState('');

  const title = useWatch({
    control: form.control,
    name: 'title',
  });

  const description = useWatch({
    control: form.control,
    name: 'description',
  });

  const tags = useWatch({
    control: form.control,
    name: 'tags',
  });

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPreview((prev) => !prev);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();

    const tag = tagValue.trim();
    if (!tag || tags.includes(tag)) return;

    form.setValue('tags', [...tags, tag], {
      shouldDirty: true,
      shouldValidate: true,
    });

    setTagValue('');
  };

  const handleRemoveTag = (tag: string) => {
    form.setValue(
      'tags',
      tags.filter((item) => item !== tag),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
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
                  placeHolder="제목을 입력해주세요."
                />
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field }) => (
                    <div className={styles.categoryDropdown}>
                      <Dropdown<ProjectCategoryType>
                        isOpen={menuOpen}
                        setOpen={setMenuOpen}
                        dropdownList={PROJECT_TYPE}
                        positionStyle={{ top: '50px' }}
                        value={field.value as ProjectCategoryType}
                        onSelect={(value) => {
                          if (!value) return;
                          field.onChange(value);
                        }}
                      >
                        <span
                          onClick={toggleMenu}
                          className={styles.selectMenu}
                        >
                          {field.value || '타입선택'}
                        </span>
                      </Dropdown>
                    </div>
                  )}
                />
              </div>
              <div className={styles.tagContainer}>
                {tags && (
                  <>
                    {tags?.map((item) => (
                      <div key={item} className={styles.tag}>
                        <span>{item}</span>
                        <button
                          onClick={() => handleRemoveTag(item)}
                          type="button"
                        >
                          <CloseIcon />
                        </button>
                      </div>
                    ))}
                  </>
                )}
                <Input
                  variant="unstyled"
                  className={styles.tagStyle}
                  inputClassName={styles.tagInput}
                  showErrorMessage={false}
                  type="text"
                  id="tags"
                  placeHolder="태그를 입력해주세요."
                  onKeyDown={handleAddTag}
                  value={tagValue}
                  onChange={(e) => setTagValue(e.target.value)}
                />
              </div>
            </Tiptap>
          )}

          <div className={styles.buttonContainer}>
            <div className={styles.buttonInner}>
              <div className={styles.closeButton}>
                <Button type="button" onButtonClick={closeProject}>
                  <CloseIcon color="#555555" />
                  <span>닫기</span>
                </Button>
              </div>
              <div className={styles.submitButton}>
                <Button
                  key={isPreview ? 'preview' : 'edit'}
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
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
