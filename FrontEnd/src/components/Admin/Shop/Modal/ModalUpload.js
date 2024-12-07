import React, { useState } from "react";
import './upload.css'
import {Image, Upload,Button,Form,Input,InputNumber,Select
} from 'antd'
import { PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;


function ModalUpload  (){
  const [form] = Form.useForm();
  const variant = Form.useWatch('variant', form);

  const [isUploading, setIsUploading] = useState(false); 
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([
   
  ]);

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  
  // const handlePreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setPreviewImage(file.url || file.preview);
  //   setPreviewOpen(true);
  // };

  // const handleChange = ({ fileList: newFileList, file }) => {
  //   console.log('Upload status:', file.status); // Kiểm tra trạng thái (e.g., 'uploading', 'done', 'error')
  //   if (file.status === 'error') {
  //     console.error('Upload failed:', file.response); // Log lỗi nếu upload thất bại
  //   }
  //   setFileList(newFileList);
  // };
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
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("images", file.originFileObj); 
    });

    try {
      const response = await fetch("https://your-api-url.com/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Upload successful!");
        setFileList([]);
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("An error occurred.");
    } finally {
      setIsUploading(false);
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
                >
                   <Form.Item
                    name="productName"
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
                    name="percentSale"
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
                    name="qty"
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
                      <Select  />
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
                          disabled={fileList.length === 0}
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
    {/* <div class="info-1">
                        <div class="product-info">
                            <h2 class="product-name">Product Name</h2>
                        </div>
                        <div class="price-line">
                           
                        </div>
                        <div class="brand-line">

                        </div>
                        <p class="grey discription">discription</p>
                    </div> */}
                    {/* <div class="info-2">
                        <hr/>
                        <div className="container-atc">

                        </div>
                        
                        <hr/>
                        <p class="cate"><b>Category: </b>category</p>
  
                    </div> */}