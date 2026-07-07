import { ArrowRight, BadgeCheck, BarChart3, LockKeyhole, Store } from 'lucide-react';
import React from 'react';

export default function PlatformLanding() {
  return (
    <div className="bg-white text-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="mx-auto grid min-h-[76vh] max-w-7xl grid-cols-1 items-center gap-10 px-5 py-12 md:grid-cols-[1.02fr_0.98fr] md:px-8 lg:px-10">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">
              <Store className="h-4 w-4" />
              Plataforma de comercio para lojas modernas
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-slate-950 md:text-6xl">
              Cartify
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Venda online, gerencie produtos, acompanhe pedidos e controle sua loja em um painel unico.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/admin"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Entrar no painel
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/account/register"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-300 px-5 text-sm font-semibold text-slate-950 transition hover:border-slate-950"
              >
                Criar conta
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald-600" />
                Catalogo e checkout
              </span>
              <span className="inline-flex items-center gap-2">
                <LockKeyhole className="h-4 w-4 text-emerald-600" />
                Painel administrativo
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-emerald-100/70" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="p-5 text-white">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-white/10 p-4">
                    <p className="text-sm text-white/60">Vendas hoje</p>
                    <p className="mt-3 text-3xl font-semibold">R$ 8.420</p>
                  </div>
                  <div className="rounded-lg bg-emerald-400 p-4 text-slate-950">
                    <p className="text-sm text-slate-700">Pedidos</p>
                    <p className="mt-3 text-3xl font-semibold">126</p>
                  </div>
                </div>
                <div className="mt-5 rounded-lg bg-white p-4 text-slate-950">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Painel da loja</p>
                      <p className="text-sm text-slate-500">Produtos, clientes e pedidos</p>
                    </div>
                    <BarChart3 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="mt-5 space-y-3">
                    <div className="h-3 w-full rounded-full bg-slate-100">
                      <div className="h-3 w-3/4 rounded-full bg-emerald-500" />
                    </div>
                    <div className="h-3 w-full rounded-full bg-slate-100">
                      <div className="h-3 w-1/2 rounded-full bg-slate-900" />
                    </div>
                    <div className="h-3 w-full rounded-full bg-slate-100">
                      <div className="h-3 w-2/3 rounded-full bg-amber-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 py-10 md:grid-cols-3 md:px-8 lg:px-10">
        {[
          ['Monte sua vitrine', 'Cadastre produtos, imagens, categorias e colecoes.'],
          ['Venda com checkout', 'Receba pedidos com carrinho, pagamentos e calculo de envio.'],
          ['Gerencie tudo', 'Acompanhe clientes, cupons, CMS, estoque e pedidos no admin.']
        ].map(([title, description]) => (
          <div key={title} className="rounded-lg border border-slate-200 p-5">
            <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
            <p className="mt-2 leading-7 text-slate-600">{description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
