import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-light tracking-wider">МШКС СТАЛЬ</div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#services" className="text-sm tracking-wide hover:text-primary transition-colors">Услуги</a>
            <a href="#portfolio" className="text-sm tracking-wide hover:text-primary transition-colors">Портфолио</a>
            <a href="#contact" className="text-sm tracking-wide hover:text-primary transition-colors">Контакты</a>
          </div>
          <Button variant="default" className="hidden md:flex">
            Заказать консультацию
          </Button>
          <button className="md:hidden">
            <Icon name="Menu" size={24} />
          </button>
        </nav>
      </header>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-light leading-tight">
                Металлические изделия<br />
                <span className="text-primary">премиум класса</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Создаём уникальные металлические элементы для вашего интерьера по индивидуальным эскизам
              </p>
              <div className="flex gap-4 pt-4">
                <Button size="lg" className="font-light tracking-wide">
                  Обсудить проект
                </Button>
                <Button size="lg" variant="outline" className="font-light tracking-wide">
                  Наши работы
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://cdn.poehali.dev/projects/bcaf37e8-0466-425e-8e53-7b6b0a60cad1/files/dfb34752-5a01-44fc-8b56-02f6679abfe2.jpg" 
                alt="Премиальное металлическое изделие"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-6 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">Услуги и возможности</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Работаем с любыми металлами и воплощаем самые смелые дизайнерские решения
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-4 border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                <Icon name="Pencil" size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-light">Разработка по эскизам</h3>
              <p className="text-muted-foreground leading-relaxed">
                Создаём изделия по вашим эскизам и идеям. Наши дизайнеры помогут визуализировать концепцию
              </p>
            </Card>
            <Card className="p-8 space-y-4 border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                <Icon name="Layers" size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-light">Интерьерные элементы</h3>
              <p className="text-muted-foreground leading-relaxed">
                Перегородки, панели, декоративные экраны, лестничные ограждения и другие элементы декора
              </p>
            </Card>
            <Card className="p-8 space-y-4 border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                <Icon name="Sparkles" size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-light">Премиум качество</h3>
              <p className="text-muted-foreground leading-relaxed">
                Используем латунь, сталь, бронзу и другие материалы высокого качества с идеальной обработкой
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">Портфолио работ</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Каждый проект уникален и создан специально для конкретного интерьера
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/projects/bcaf37e8-0466-425e-8e53-7b6b0a60cad1/files/3290f296-6b93-43ed-9742-24bcc672e757.jpg" 
                  alt="Лестничное ограждение"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-light mb-2">Лестничное ограждение</h3>
              <p className="text-muted-foreground">Полированная латунь, современный стиль</p>
            </div>
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/projects/bcaf37e8-0466-425e-8e53-7b6b0a60cad1/files/b184a509-0f7d-4df7-b549-cfca78436825.jpg" 
                  alt="Декоративная перегородка"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-light mb-2">Декоративная перегородка</h3>
              <p className="text-muted-foreground">Бронза с растительным орнаментом</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-secondary text-secondary-foreground">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-4xl font-light">Индивидуальный подход</h2>
          <p className="text-lg leading-relaxed opacity-90">
            Каждое изделие разрабатывается по эскизам клиента с учётом особенностей интерьера.<br />
            Мы воплощаем в металле самые сложные дизайнерские идеи
          </p>
          <Button size="lg" variant="outline" className="bg-transparent border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary mt-6">
            Обсудить ваш проект
          </Button>
        </div>
      </section>

      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4">Свяжитесь с нами</h2>
            <p className="text-muted-foreground">
              Расскажите о вашем проекте, и мы предложим решение
            </p>
          </div>
          <form className="space-y-6 max-w-xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm tracking-wide">Имя</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-card border border-input focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Ваше имя"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm tracking-wide">Телефон</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 bg-card border border-input focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm tracking-wide">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 bg-card border border-input focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm tracking-wide">Описание проекта</label>
              <textarea 
                rows={4}
                className="w-full px-4 py-3 bg-card border border-input focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Расскажите о вашем проекте"
              />
            </div>
            <Button size="lg" className="w-full font-light tracking-wide">
              Отправить заявку
            </Button>
          </form>
        </div>
      </section>

      <footer className="py-12 px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-light tracking-wider mb-4">МШКС СТАЛЬ</div>
              <p className="text-sm text-muted-foreground">
                Премиальные металлические изделия для интерьера
              </p>
            </div>
            <div>
              <h4 className="font-light mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>+7 (967) 777-14-11</p>
                <p>paul05.93@mail.ru</p>
                <p>ул. Щербакова, 150</p>
              </div>
            </div>
            <div>
              <h4 className="font-light mb-4">Социальные сети</h4>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Instagram" size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Facebook" size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 МШКС Сталь. Все права защищены</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;