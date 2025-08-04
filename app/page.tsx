import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* UMA ÁREA EXTRA QUE ENGLOBA A "DIV" ABAIXO */}
      <main className="container mx-auto py-6">
        {/* AREA DO TEXTO "BEM-VINDO" ATÉ OS DOIS BOTÕES DE BAIXO */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Bem-vindo ao Gestor de Estoque
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl">
            Gerencie seu estoque de forma eficiente com nossa plataforma
            completa de controle de produtos, vendas e clientes.
          </p>

          {/* AREA DOS BOTÕES */}
          <div className="flex space-x-4 mt-8">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
              Ver Dashboard
            </button>

            <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md">
              Ver Produtos
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
