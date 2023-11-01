import React, { useState, useEffect } from 'react';
import * as Yup from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function MyForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        agreeTerms: false,
    });

    const [formValid, setFormValid] = useState(true);

    const formSchema = Yup.object().shape({
        name: Yup
            .string()
            .min(5, "İsminiz 5 harften kısa olamaz!")
            .required("İsim kısmı boş bırakılamaz!"),
        email: Yup
            .string()
            .required("Email kısmı boş bırakılamaz!")
            .email("Geçerli bir E-mail adresi giriniz!"),
        password: Yup
            .string()
            .required("Şifre kısmı boş bırakılamaz")
            .min(8, "Şifreniz 8 karakterden kısa olamaz!"),
        agreeTerms: Yup
            .boolean()
            .oneOf([true], "Kullanım sözleşmesini onaylamanız gerekmektedir!")

    });

    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        password: "",
        agreeTerms: ""
    });
    useEffect(() => {
        console.log("formdata > ", formData);
    }, [formData]);

    useEffect(() => {
        console.error("form error > ", formErrors);
    }, [formErrors]);

    useEffect(() => {
        formSchema
            .isValid(formData)
            .then(valid => setFormValid(valid));
    }, [formData]);
    useEffect(() => {
        formData && setFormData(formData);
    }, [formData]);




    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData, [name]: newValue,
        });

        checkValidationFor(name, newValue);

    };

    const checkValidationFor = (field, value) => {
        Yup.reach(formSchema, field)
            .validate(value)
            .then(valid => {
                setFormErrors({ ...formErrors, [field]: "" });
            })
            .catch(err => {
                console.log("HATA! ", field, err.errors[0]);
                setFormErrors((prevFormErrors) => ({
                    ...prevFormErrors, [field]: err.errors[0],
                }));
            });

    }
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(formData);

    };



    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>İsim</Form.Label>
                <Form.Control
                    name="name"
                    type="text"
                    placeholder="İsminizi giriniz"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!formErrors.name}
                />
                <Form.Control.Feedback type="invalid">
                    {formErrors.name}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    name="email"
                    type="email"
                    placeholder="Email giriniz"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!formErrors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {formErrors.email}
                </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Şifre</Form.Label>
                <Form.Control
                    name="password"
                    type="password"
                    placeholder="Şifre"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!formErrors.password}
                />
                <Form.Control.Feedback type="invalid">
                    {formErrors.password}
                </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                    name="agreeTerms"
                    type="checkbox"
                    label="Kullanıcı Sözleşmesi"
                    value={formData.agreeTerms}
                    onChange={handleChange} />
            </Form.Group>


            <Button
                variant="primary"
                type="submit"
                onChange={handleSubmit}>
                Kaydet
            </Button>
        </Form>

    );
};

export default MyForm;
