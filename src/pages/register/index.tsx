import { Link, useNavigate } from "react-router-dom"
import logoImg from "../../assets/logo.svg"
import { Container } from "../../components/container"
import { Input } from "../../components/input"
import { z } from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { auth } from "../../services/firebaseConnection"
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const schema = z.object({
    name: z.string().nonempty("O Campo nome é obrigatorio"),
    email: z.string().email("Insira um email válido").nonempty("O Campo email é obrigatorio !"),
    password: z.string().min(6, "A senah deve ter 6 caracteres").nonempty("O Campo senha é obrigatorio")
})

type FormData = z.infer<typeof schema>

export function Cadastro() {
    const { handleInfoUser } = useContext(AuthContext)
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    useEffect(() => {
        async function handleLogout() {
            await signOut(auth)
        }
        handleLogout();
    }, [])

    async function onSubmit(data: FormData) {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (user) => {
                await updateProfile(user.user, {
                    displayName: data.name
                })
                handleInfoUser({
                    name: data.name,
                    email: data.email,
                    uid: user.user.uid
                })
                console.log("Cadastrado com sucesso")
                toast.success("Cadastrado com sucesso", {
                    style: {
                        borderRadius: 10,
                        backgroundColor: "#121212",
                        color: "#FFF"
                    }
                })
                navigate("/dashboard", { replace: true })
            })
            .catch(() => {
                console.log("Erro ao cadastrar este Usuario")
                console.log(errors);
                toast.error("Erro ao Cadastrar", {
                    style: {
                        borderRadius: 10,
                        backgroundColor: "#121212",
                        color: "#FFF"
                    }
                })
            })
    }

    return (
        <Container>
            <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
                <Link to="/" className="mb-6 max-w-sm w-full">
                    <img
                        src={logoImg}
                        alt="Logo do site"
                        className="w-full"
                    />
                </Link>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white p-4 max-w-xl w-full rounded-lg">

                    <div className="mb-3">
                        <Input
                            type="text"
                            placeholder="Digite seu nome completo ..."
                            name="name"
                            error={errors.name?.message}
                            register={register}
                        />
                    </div>

                    <div className="mb-3">
                        <Input
                            type="email"
                            placeholder="Digite seu email ..."
                            name="email"
                            error={errors.email?.message}
                            register={register}
                        />
                    </div>

                    <div className="mb-3">
                        <Input
                            type="password"
                            placeholder="Digite sua senha ..."
                            name="password"
                            error={errors.password?.message}
                            register={register}
                        />
                    </div>
                    <button type="submit" className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium">
                        Cadastrar
                    </button>
                </form>
                <Link to="/login">
                    Já possui uma conta? Faça o login
                </Link>
            </div>
        </Container>
    )
}

