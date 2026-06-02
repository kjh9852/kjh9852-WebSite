import {
  FormProvider,
  type UseFormReturn,
  type SubmitHandler,
} from 'react-hook-form';

import { Loading, TextArea } from '@/components/ui';

import { type PostFormValues } from '../../schemas/post.schema';

import styles from './PostForm.module.scss';

interface PostFormProps {
  onUpdatePost: SubmitHandler<PostFormValues>;
  form: UseFormReturn<PostFormValues>;
  isPending: boolean;
  isEdit?: boolean;
}

export default function PostForm({
  onUpdatePost,
  form,
  isPending,
  isEdit,
}: PostFormProps) {
  const { isValid, isDirty } = form.formState;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{isEdit ? '방명록 수정' : '방명록 작성'}</h2>
      <FormProvider {...form}>
        <form
          className={styles.formContainer}
          onSubmit={form.handleSubmit(onUpdatePost)}
        >
          <TextArea
            name="content"
            placeholder="내용을 입력해주세요"
            helperText="최대 255자까지 입력 가능합니다"
          />
          <button
            disabled={!isValid || isPending || (isEdit ? !isDirty : false)}
            className={styles.addPostButton}
          >
            {isPending ? <Loading size="small" /> : '완료'}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
