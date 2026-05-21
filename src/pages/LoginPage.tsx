import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@optistock.ai');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Left: Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 gradient-primary opacity-10" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />

        <div 
          className="relative z-10 flex flex-col justify-center h-full max-w-3xl mx-auto w-full"
          style={{ paddingLeft: '4rem', paddingRight: '4rem' }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text-primary">OptiStock AI</h1>
              <p className="text-xs text-text-muted tracking-widest uppercase">AI Platform</p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-text-primary leading-tight mb-4">
            Gestión Inteligente<br />
            de Inventario con{' '}
            <span className="gradient-text-ai">IA</span>
          </h2>
          <p className="text-text-secondary max-w-md leading-relaxed">
            Predice la demanda, previene quiebres de stock y optimiza tus compras
            con agentes de inteligencia artificial.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { value: '-35%', label: 'Reducción de sobrestock' },
              { value: '95%', label: 'Precisión en predicciones' },
              { value: '2.5x', label: 'ROI promedio' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold gradient-text-primary">{stat.value}</p>
                <p className="text-xs text-text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold gradient-text-primary">OptiStock AI</h1>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-1">Bienvenido de vuelta</h2>
          <p className="text-sm text-text-muted mb-8">Ingresá tus credenciales para acceder al dashboard</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-surface border border-border-default rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-bg-surface border border-border-default rounded-xl px-4 py-3 pr-11 text-sm text-text-primary placeholder-text-muted outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded border-border-default bg-bg-surface text-primary-500 focus:ring-primary-500/25"
                />
                <span className="text-sm text-text-muted">Recordarme</span>
              </label>
              <button type="button" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-primary text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg hover:shadow-glow-primary disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Iniciar Sesión <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 p-4 bg-bg-surface rounded-xl border border-border-default">
            <p className="text-xs text-text-muted text-center">
              <span className="font-medium text-text-secondary">Demo:</span> Las credenciales ya están precargadas. Hacé clic en "Iniciar Sesión".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
