import React, { useState } from "react";
import './upload.css'
import {
  Image, Modal, Upload, Button, Form, Input, InputNumber, Select, message
} from 'antd'
import { useEffect } from "react";

import { ConsoleSqlOutlined, PlusOutlined } from "@ant-design/icons";
import instance from "../../../../utils/axiosCustomize"
const { TextArea } = Input;

function ModalUpload(props) {
  const [form] = Form.useForm();
  const variant = Form.useWatch('variant', form);

  const [isUploading, setIsUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [categories, setCatgories] = useState([]);
  const [discount,setDiscount]=useState(0);
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
      const response = await instance.post('/api/v1/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 200) {
        throw new Error(`Upload failed with status ${response.status}`);
      }


      const result = await response.data;
      console.log(result);
      console.log('Uploaded fileId:', result.file?.fileId);
      return result.file?.fileId;
    } catch (error) {
      console.error('Error during upload:', error);
      return null;
    }
  };

  const uploadFiles = async () => {
    const uploadedFileIds = await Promise.all(fileList.map(async (fileItem) => {
      const file = fileItem.originFileObj;
      return await uploadFile(file);
    }));

    const successfulUploads = uploadedFileIds.filter(fileId => fileId !== null);
    console.log('File list fileIds:', fileList.length);
    console.log('Uploaded fileIds:', successfulUploads.length);

    if (successfulUploads.length === fileList.length && fileList.length > 0) {
      form.setFieldsValue({
        'product_images': successfulUploads,
      });
      message.success('All product images uploaded successfully');
    } else {
      message.error('Some images might have failed to upload');
    }
    return successfulUploads;
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
  useEffect(() => {
    console.log(fileList);
  }, [fileList]);

  const handlePreview = async (file) => {
    const reader = new FileReader(); // Initialize a FileReader to read the file
    reader.readAsDataURL(file.originFileObj); // Read the raw file as a Base64 data URL
    reader.onload = () =>{
      Modal.info({
        content: <Image src={reader.result} alt="Preview" />,
        onOk: () => {}, 
        onClose:()=>{}
      });
    } ; // Set the result as the preview image
    setPreviewOpen(true); // Open the preview modal or display
    
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    try {
      const formData = form.getFieldsValue();
      const uploadedFileIds = await uploadFiles();
      formData.product_images = uploadedFileIds;
      formData.discount=discount/100;
      console.log("a",formData)
      const response = await instance.post('/api/v1/product', formData);

      message.success('Create product successfully');
      setIsUploading(false);
      form.resetFields();
      setFileList([]);

      if (props.onClose) {
        props.onClose();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('An error occurred while submitting');
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

    const requiredFields = ['product_name', 'price', 'stock', 'brand', 'category', 'value', 'description'];

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

        </div>

        <div className="info-area-admin">
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
                style={{ width: '400px', fontWeight: 'bold', fontSize: '24px' }}
                placeholder="Enter product name"
                maxLength={30} />
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
                    min={0} />
                </Form.Item>
                <Form.Item
                  className="input-percent-sale margin-left8"
                  //name="discount"
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
                    value={discount}
                    onChange={setDiscount}
                    min={0}
                    max={100} />
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
                  min={0} />
              </Form.Item>
            </div>

            <hr />
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
                style={{ width: '200px', maxLength: 20 }}
                placeholder="Brand name" />
            </Form.Item>

            <Form.Item
              name="description"
            >
              <Input.TextArea className="discription"
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
