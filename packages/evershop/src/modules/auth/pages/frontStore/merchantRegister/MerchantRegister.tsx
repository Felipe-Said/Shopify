import { EmailField } from '@components/common/form/EmailField.js';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { PasswordField } from '@components/common/form/PasswordField.js';
import { Button } from '@components/common/ui/Button.js';
import { ArrowRight, Building2, Mail, Store, User } from 'lucide-react';
import React from 'react';
import { toast } from 'react-toastify';

interface MerchantRegisterProps {
  merchantSignupApi: string;
  adminLoginUrl: string;
}

export default function MerchantRegister({
  merchantSignupApi,
  adminLoginUrl
}: MerchantRegisterProps) {
  const onSuccess = () => {
    toast.success('Conta criada. Entre no painel para configurar sua loja.');
    window.location.href = adminLoginUrl;
  };

  return (
    <div className="min-h-[72vh] bg-white px-5 py-10 text-slate-950">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-[0.92fr_1.08fr]">
        <div className="self-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">
            <Store className="h-4 w-4" />
            Comece no Cartify
          </div>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Crie sua conta de lojista
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
            Cadastre o dono da loja e acesse o painel para configurar produtos,
            pedidos, pagamentos e paginas.
          </p>
          <a
            href={adminLoginUrl}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 hover:text-emerald-700"
          >
            Ja tenho conta
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <Form
            action={merchantSignupApi}
            method="POST"
            id="merchantRegisterForm"
            submitBtn={false}
            onSuccess={onSuccess}
            onError={(error) => toast.error(error)}
            className="space-y-4"
          >
            <InputField
              name="storeName"
              label="Nome da loja"
              placeholder="Minha loja"
              prefixIcon={<Building2 className="h-5 w-5" />}
              required
              validation={{
                minLength: {
                  value: 2,
                  message: 'Informe um nome de loja valido'
                }
              }}
            />
            <InputField
              name="fullName"
              label="Nome do lojista"
              placeholder="Seu nome"
              prefixIcon={<User className="h-5 w-5" />}
              required
              validation={{
                minLength: {
                  value: 2,
                  message: 'Informe seu nome'
                }
              }}
            />
            <EmailField
              name="email"
              label="Email"
              placeholder="voce@empresa.com"
              prefixIcon={<Mail className="h-5 w-5" />}
              required
            />
            <PasswordField
              name="password"
              label="Senha"
              placeholder="No minimo 8 caracteres"
              required
              minLength={8}
              showToggle
            />
            <Button type="submit" size="lg" className="w-full">
              Criar loja
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
  query Query {
    merchantSignupApi: url(routeId: "merchantSignup")
    adminLoginUrl: url(routeId: "adminLogin")
  }
`;
