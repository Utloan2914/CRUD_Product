import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Card, CardBody, CardImg, Button, Container, Row, Col, Input, Alert } from 'reactstrap';
import { useRouter } from 'next/navigation';
import { FormData } from '../../component/formData/page';
import defaultImage from 'public/images/default-image.png';

interface EditProfileProps {
  formDataProp: FormData;
  onUpdateProfile: (updatedData: FormData) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ formDataProp, onUpdateProfile }) => {
  const [formData, setFormData] = useState<FormData | null>(formDataProp);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  useEffect(() => {
    const storedFormData = localStorage.getItem('formData');
    const storedImage = localStorage.getItem('urlImage');
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData);
      if (storedImage) {
        parsedFormData.urlImage = storedImage;
      }
      setFormData(parsedFormData);
    } else if (storedImage) {
      setFormData(prevState => ({
        ...prevState!,
        urlImage: storedImage
      }));
    }
  }, []);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState!,
      [name]: value
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prevState => ({
        ...prevState!,
        urlImage: imageUrl
      }));
      localStorage.setItem('urlImage', imageUrl);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData) return;

    const { name, email, password, phone, address } = formData;

    if (!name || !email || !password || !phone || !address) {
      setError('Tất cả các trường đều phải được điền.');
      return;
    }

    // Call onUpdateProfile to update profile data
    onUpdateProfile(formData);

    localStorage.setItem('formData', JSON.stringify(formData));
    localStorage.setItem('urlImage', formData.urlImage || '');
    setSuccess('Chỉnh sửa thông tin thành công!');
    router.push('/viewProfile');
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid style={{ width: '90%' }}>
      <Card className='text-black m-5' style={{ borderRadius: '25px' }}>
        <CardBody>
          <Row>
            <Col md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Chỉnh sửa thông tin cá nhân</p>
              {error && <Alert color="danger">{error}</Alert>}
              {success && <Alert color="success">{success}</Alert>}
              <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-user me-3" style={{ fontSize: '1.5rem' }}></i>
                  <Input type='text' name='name' placeholder='Tên của bạn' className='w-100' value={formData.name} onChange={handleChange} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-envelope me-3" style={{ fontSize: '1.5rem' }}></i>
                  <Input type='email' name='email' placeholder='Email của bạn' value={formData.email} onChange={handleChange} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-lock me-3" style={{ fontSize: '1.5rem' }}></i>
                  <Input type='password' name='password' placeholder='Mật khẩu' value={formData.password} onChange={handleChange} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-phone me-3" style={{ fontSize: '1.5rem' }}></i>
                  <Input type='text' name='phone' placeholder='Số điện thoại' value={formData.phone} onChange={handleChange} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-home me-3" style={{ fontSize: '1.5rem' }}></i>
                  <Input type='text' name='address' placeholder='Địa chỉ' value={formData.address} onChange={handleChange} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <Input type='file' accept="image/*" name='urlImage' onChange={handleImageChange} />
                </div>

                <Button type="submit" className='mb-4' size='lg'>Lưu</Button>
              </form>
            </Col>

            <Col md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <CardImg src={formData.urlImage || ' defaultImage'} fluid />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
};

export default EditProfile;
