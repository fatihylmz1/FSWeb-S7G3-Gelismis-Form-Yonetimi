import React, { useState, useEffect } from 'react';
import * as Yup from "yup";

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
        formSchema
            .isValid(formData)
            .then(valid => setFormValid(valid));
    }, [formData]);



    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue,
        });
        Yup.reach(formSchema, name)
            .validate(value)
            .then(valid => { setFormErrors({ ...formErrors, [name]: "" }); })
            .catch(err => { setFormErrors({ ...formErrors, [name]: err.errors[0] }); });

    };
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(formData);

    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                İsim:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange} />
            </label>

            <br />

            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange} />
            </label>

            <br />

            <label>
                Şifre:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange} />
            </label>

            <br />

            <label>
                Kullanım Şartları:
                <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                />
            </label>

            <br />

            <button type="submit">Gönder</button>
        </form>
    );
}

export default MyForm;
