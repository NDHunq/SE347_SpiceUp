import React, { useState } from "react";
import './upload.css'
import {Image, Upload,Button,Form,Input,InputNumber,Select,message
} from 'antd'
import { useEffect } from "react";

import { PlusOutlined } from "@ant-design/icons";
import instance from "../../../../utils/axiosCustomize"
const { TextArea } = Input;

function ModalUpload  (){
  const [form] = Form.useForm();
  const variant = Form.useWatch('variant', form);

  const [isUploading, setIsUploading] = useState(false); 
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [categories,setCatgories]=useState([]);
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await instance.post('/api/v1/image/upload', formData);
  
      if (!response.ok) {
        throw new Error('Upload failed');
      }
  
      const result = await response.json();
      console.log('Uploaded fileId:', result.file?.fileId);
      return result.file?.fileId; 
    } catch (error) {
      console.error('Error during upload:', error);
      return null;
    }
  };
  
  const uploadFiles = async () => {
    const uploadedFileIds = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i].originFileObj; 
      const fileId = await uploadFile(file);
      if (fileId) {
        uploadedFileIds.push(fileId);
      }
    }
    console.log('Uploaded fileIds:', uploadedFileIds);
  
    if (uploadedFileIds.length === fileList.length && fileList.length>0) {
      form.setFieldsValue({
        'product_images': uploadedFileIds, 
      });
      alert('All images product uploaded successfully');
    } else {
      alert('Some images might have failed to upload');
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await instance.get('/api/v1/category');
        if (response.status === 200) {
          setCatgories(response.data.data); 
          console.log(categories)
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  
  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };  
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePreview = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => setPreviewImage(reader.result); 
  };

  const handleSubmit = async () => {
    setIsUploading(true); 
    try {
      const formData = form.getFieldsValue();
      const uploadedFileIds = await uploadFiles();
      formData.product_images = uploadedFileIds; 
      console.log(formData)
      const response = await instance.post('/api/v1/product', formData);
  
      if (response?.status === 200) {
        message.success('Form submitted successfully');
        form.resetFields(); 
        setFileList([]); 
      } else {
        message.warning('Failed to submit the form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting');
    }
  };
  

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormChange = () => {
    const formValues = form.getFieldsValue(); 
    console.log("Form values:", formValues); 
  
    const requiredFields = ['product_name', 'price', 'stock', 'brand', 'category', 'value'];
  
    const allRequiredFieldsFilled = requiredFields.every(
      (field) => formValues[field] !== undefined && formValues[field] !== null && formValues[field] !== ''
    );
  
    const hasNoErrors = form
      .getFieldsError()
      .every(({ errors }) => errors.length === 0);
  
    setIsFormValid(allRequiredFieldsFilled && hasNoErrors);
    console.log("Is form valid:", allRequiredFieldsFilled && hasNoErrors);
  };
  
  
  
  return (
    <div >
      <div className="modal-content">
                <div className="im-area">
                <div className="img-list-admin">
                <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      className="vertical-upload"
                      maxCount={4}
                      beforeUpload={() => false}
                    >
                    {fileList.length >= 4 ? null : uploadButton}
                    </Upload>

                    </div>
                    <div class="img-product">
                    {previewImage && <Image src={previewImage} alt="Preview" />}

                    </div>
                </div>

                <div className="info-area">
                <Form
                  name="basic"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  onValuesChange={handleFormChange} 
                  form={form}
                >
                   <Form.Item
                    name="product_name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input product name!',
                      },
                    ]}
                  >
                    <Input 
                      style={{ width:'400px',fontWeight: 'bold' , fontSize:'24px'}}
                      placeholder="Enter product name" 
                      maxLength={30}/>
                  </Form.Item>
                  {/* price line - remaining */}
                  <div class="container-price-remain">
                    <div className="price-line">
                    <Form.Item
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: 'Please input price!',
                      },
                    ]}
                  >
                    <InputNumber 
                    className="input-pirce"
                    placeholder="Price"
                    addonAfter="đ"
                    type='number'
                    min={0}  />
                  </Form.Item>
                  <Form.Item
                    className="input-percent-sale margin-left8"
                    name="discount"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <InputNumber 
                    className="input-percent-sale"
                    placeholder="Off"
                    addonAfter="%"
                    type='number'
                    min={0} 
                    max={99} />
                  </Form.Item>
                    </div>
                    
                    <Form.Item
                    label="Remain:"
                    name="stock"
                    rules={[
                      {
                        required: true,
                        message: 'Please input!',
                      },
                    ]}
                  >
                    <InputNumber
                    placeholder="qty"
                    className="input-qty"
                    type='number'
                    min={0}  />
                  </Form.Item>
                  </div>

                  <hr/>
                  <Form.Item
                    label="Brand"
                    name="brand"
                    rules={[
                      {
                        required: true,
                        message: 'Please input!',
                      },
                    ]}
                  >
                    <Input 
                      style={{ width:'200px', maxLength:20}}
                    placeholder="Brand name"/>
                  </Form.Item>
                  
                  <Form.Item
                    name="discription"
                  >
                  <Input.TextArea  className="discription"
                  showCount 
                  maxLength={100} 
                  onChange={onChange} 
                  placeholder="Discription" />

                  </Form.Item>
                  <div className="container-unit-category">
                    <Form.Item
                      label="Category"
                      name="category"
                      className="margin-right8"
                      rules={[
                        {
                          required: true,
                          message: 'Please input!',
                        },
                      ]}
                    >
                      <Select style={{ width: '200px' }}>
                      {categories.map((category) => (
                        <Select.Option key={category._id} value={category._id}>
                          {category.category_name}
                        </Select.Option>
                      ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Unit"
                      name="value"
                      rules={[
                        {
                          required: true,
                          message: 'Please input!',
                        },
                      ]}
                    >
                      <Input placeholder="Enter unit of pieces" />
                    </Form.Item>
                  </div>
                 
                  <Button
                          type="primary"
                          onClick={handleSubmit}
                          loading={isUploading}
                          disabled={!isFormValid || fileList.length === 0} 
                        >
                          Upload Product
                        </Button>
                </Form>
                </div>
            </div>   
          </div>
  );
};
export default ModalUpload;
// const {product_name, category, price, stock, value, discount, brand, description, product_images} = req.body;
