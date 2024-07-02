import { FormData } from '@/app/profile/types/page';

interface EditProfileProps {
  formDataProp: FormData;
  onUpdateProfile: (updatedData: FormData) => void;
}

export default EditProfileProps;