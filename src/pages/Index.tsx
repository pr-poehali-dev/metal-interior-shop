import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Logo from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";
import InputMask from "react-input-mask";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: "-100px" }
};

const staggerItem = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('https://functions.poehali.dev/19c75b28-d750-4c13-b264-82e4f06a173f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Заявка отправлена!",
          description: "Мы свяжемся с вами в ближайшее время.",
        });
        e.currentTarget.reset();
        
        // Open WhatsApp in new tab
        if (result.whatsapp_url) {
          window.open(result.whatsapp_url, '_blank');
        }
      } else {
        throw new Error(result.error || 'Ошибка отправки');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex gap-8 items-center">
            <a 
              href="#services" 
              className="text-sm tracking-wide hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Услуги
            </a>
            <a 
              href="#portfolio" 
              className="text-sm tracking-wide hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Портфолио
            </a>
            <a 
              href="#contact" 
              className="text-sm tracking-wide hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Контакты
            </a>
          </div>
          <Button variant="default" className="hidden md:flex" onClick={() => {
            const contactSection = document.getElementById('contact');
            contactSection?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Заказать консультацию
          </Button>
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background border-b border-border overflow-hidden"
            >
              <div className="container mx-auto px-6 py-4 space-y-4">
                <a 
                  href="#services" 
                  className="block text-sm tracking-wide hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Услуги
                </a>
                <a 
                  href="#portfolio" 
                  className="block text-sm tracking-wide hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Портфолио
                </a>
                <a 
                  href="#contact" 
                  className="block text-sm tracking-wide hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Контакты
                </a>
                <Button variant="default" className="w-full mt-2" onClick={() => {
                  setMobileMenuOpen(false);
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Заказать консультацию
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-6xl font-light leading-tight">
                Изделия из металла<br />
                <span className="text-primary">и мебель на заказ</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Изготовление металлических изделий из латуни, нержавейки, стали премиум-класса. Мебель из металла для дома и офиса по индивидуальным проектам. Екатеринбург
              </p>
              <div className="flex gap-4 pt-4">
                <Button size="lg" className="font-light tracking-wide" onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Обсудить проект
                </Button>
                <Button size="lg" variant="outline" className="font-light tracking-wide" onClick={() => {
                  const portfolioSection = document.getElementById('portfolio');
                  portfolioSection?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Наши работы
                </Button>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <img 
                src="https://cdn.poehali.dev/projects/bcaf37e8-0466-425e-8e53-7b6b0a60cad1/files/dfb34752-5a01-44fc-8b56-02f6679abfe2.jpg" 
                alt="Премиальное металлическое изделие"
                className="w-full h-[500px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-6 bg-card">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-light mb-4">Изготовление изделий из металла</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Производство металлической мебели и изделий из латуни, нержавейки, стали. Металлоконструкции на заказ для дома и бизнеса
            </p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={staggerItem} transition={{ delay: 0 }}>
              <Card className="p-8 space-y-4 border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                  <Icon name="Pencil" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-light">Мебель из металла на заказ</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Столы, стулья, стеллажи, полки из нержавейки, латуни и стали. Разработка по индивидуальным эскизам
                </p>
              </Card>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.2 }}>
              <Card className="p-8 space-y-4 border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                  <Icon name="Layers" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-light">Декоративные изделия из металла</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Перегородки, панели, лестничные ограждения из нержавейки, перила, декоративные экраны. Художественная обработка металла
                </p>
              </Card>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.4 }}>
              <Card className="p-8 space-y-4 border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                  <Icon name="Sparkles" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-light">Работа с любыми металлами</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Изделия из латуни, нержавеющей стали, бронзы, меди. Сварочные работы, ковка металла, гибка, резка. Обработка металла любой сложности
                </p>
              </Card>
            </motion.div>
          </motion.div>
          <motion.div 
            className="mt-12 text-center"
            {...fadeInUp}
          >
            <Button size="lg" className="font-light tracking-wide" onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Узнать стоимость
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-light mb-4">Портфолио работ</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Каждый проект уникален и создан специально для конкретного интерьера
            </p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={staggerItem} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/bbacbab4-a4e4-41a7-908f-12b9be0f3046.jpeg" 
                  alt="Декоративная панель из латуни"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Декоративная панель</h3>
              <p className="text-sm text-muted-foreground">Геометрический узор, латунь</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.1 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/ffe43167-bf5c-440d-a08f-24029d267792.jpeg" 
                  alt="Кухонная полка"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Кухонная полка</h3>
              <p className="text-sm text-muted-foreground">Нержавеющая сталь, минимализм</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.2 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/a3f84a54-a4e3-4784-84bb-56ef1b5c4a5e.jpeg" 
                  alt="Журнальный столик"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Журнальный столик</h3>
              <p className="text-sm text-muted-foreground">Сталь и дерево, дизайнерский</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.3 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/8962d003-dae9-4b9e-b2f4-54628cf0c380.jpeg" 
                  alt="Мебель с ажурным узором"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Мебельный комплект</h3>
              <p className="text-sm text-muted-foreground">Резная сталь, растительный орнамент</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.4 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/27543029-d706-487e-bf7e-2817cc4aa5c5.jpeg" 
                  alt="Садовая мебель с подсветкой"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Садовая мебель</h3>
              <p className="text-sm text-muted-foreground">Сталь с подсветкой, уличное применение</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.5 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/a24d85e9-66a0-4a42-93e4-027caebb833d.jpeg" 
                  alt="Консоль с каллиграфией"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Консоль дизайнерская</h3>
              <p className="text-sm text-muted-foreground">Гравировка на металле, авторская</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.6 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/5bf3af87-47cb-4fcf-adbd-259f8c93f8d8.jpeg" 
                  alt="Обеденный стол"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Обеденный стол</h3>
              <p className="text-sm text-muted-foreground">Чёрная сталь, геометрические ножки</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.7 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/1c955056-fa4f-4f9b-806b-9d9179423252.jpeg" 
                  alt="Журнальный столик с подсветкой"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Столик с подсветкой</h3>
              <p className="text-sm text-muted-foreground">Латунь, стекло, встроенная LED</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.8 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/637e74a0-2ade-48e4-a218-379f674f94f3.jpeg" 
                  alt="Светильники ресторанные"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Светильники премиум</h3>
              <p className="text-sm text-muted-foreground">Металл, стекло, коммерческое применение</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.9 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/6211cba8-5c85-41d6-8606-9b7c1e1608e4.jpeg" 
                  alt="Кресла дизайнерские"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Дизайнерские кресла</h3>
              <p className="text-sm text-muted-foreground">Медная рамка, текстиль, премиум</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 1.0 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/c26ed585-017c-4d2d-91bb-02c08140a5ad.jpeg" 
                  alt="Приставной столик"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Приставной столик</h3>
              <p className="text-sm text-muted-foreground">Латунь, мрамор, минимализм</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 1.1 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/1b2b7470-59c1-4c13-a05b-9f7265da8bdc.jpeg" 
                  alt="Вешалки для бутика"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Вешалки для бутика</h3>
              <p className="text-sm text-muted-foreground">Латунь, коммерческое оборудование</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 1.2 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/af2205d7-7431-4851-b903-7b673e33884f.jpeg" 
                  alt="Зеркала с подсветкой"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Зеркала с подсветкой</h3>
              <p className="text-sm text-muted-foreground">Латунная рамка, встроенный свет</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 1.3 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/de1d51b4-767e-4fe7-9ff4-50eb9392d0af.jpeg" 
                  alt="Стеллаж и ТВ тумба"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Стеллаж и ТВ тумба</h3>
              <p className="text-sm text-muted-foreground">Чёрная сталь, индустриальный стиль</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 1.4 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/df8efbfa-4fee-4436-9016-039e53bc5e4e.jpeg" 
                  alt="Стеклянная крыша"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Крыша со стеклом</h3>
              <p className="text-sm text-muted-foreground">Стальной каркас, панорамное стекло</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 1.5 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/97f29d83-5ccb-4f1d-a657-9bc2c88af4bc.jpeg" 
                  alt="Камин облицовка"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Облицовка камина</h3>
              <p className="text-sm text-muted-foreground">Сталь, дерево, интерьерный дизайн</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 1.6 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/e09fe077-b0df-4c50-a3a9-2bfac29c2d95.jpeg" 
                  alt="Навес для барбекю"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Навес для барбекю</h3>
              <p className="text-sm text-muted-foreground">Стальная конструкция, уличное применение</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 1.7 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/a78d88ee-2496-403e-8181-eb35b836f53b.jpeg" 
                  alt="Перегородка ресторанная"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Декоративная перегородка</h3>
              <p className="text-sm text-muted-foreground">Оранжевый металл, коммерческое пространство</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 1.8 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/83c8a668-9822-452b-9e93-91915efd3050.jpeg" 
                  alt="Второй свет"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Второй свет</h3>
              <p className="text-sm text-muted-foreground">Стальной каркас, панорамное стекло</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 1.9 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/2df0c270-3e0f-444f-8ec2-2a11c5388c86.jpeg" 
                  alt="Кровать с балдахином"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Кровать с балдахином</h3>
              <p className="text-sm text-muted-foreground">Стальной каркас, лофт интерьер</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 2.0 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/991ee845-028c-4fd2-9e38-e270cc1908cc.jpeg" 
                  alt="Дизайнерский столик"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Дизайнерский столик</h3>
              <p className="text-sm text-muted-foreground">Чёрная сталь, стекло, геометрия</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 2.1 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/25ea5595-480e-480a-8226-bc6bd13482eb.jpeg" 
                  alt="Светильник коммерческий"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Светильник коммерческий</h3>
              <p className="text-sm text-muted-foreground">Металл, встроенная LED подсветка</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 2.2 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/d6a564a4-68ab-4212-b4cc-10ea7d169988.jpeg" 
                  alt="Беседка садовая"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Беседка садовая</h3>
              <p className="text-sm text-muted-foreground">Металл с подсветкой, ажурные элементы</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 2.3 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/0a13c70e-62fe-4818-847d-dfe5f0d8027c.jpeg" 
                  alt="Почтовые ящики"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Почтовые ящики</h3>
              <p className="text-sm text-muted-foreground">Сталь, для жилых комплексов</p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 2.4 }} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/26c0aa2e-e6e0-4ba5-b727-ad40ee952cd9.jpeg" 
                  alt="Стеллаж торговый"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-light mb-2">Стеллаж торговый</h3>
              <p className="text-sm text-muted-foreground">Латунь, стекло, коммерческое оборудование</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 bg-card">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-light mb-4">Как мы работаем</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Прозрачный процесс от идеи до установки готового изделия
            </p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-5 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={staggerItem} transition={{ delay: 0 }} className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 flex items-center justify-center mx-auto rounded-full">
                <Icon name="MessageSquare" size={36} className="text-primary" />
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-light text-primary">01</div>
                <h3 className="text-lg font-light">Консультация</h3>
                <p className="text-sm text-muted-foreground">
                  Обсуждаем ваши идеи и требования к изделию
                </p>
              </div>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.1 }} className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 flex items-center justify-center mx-auto rounded-full">
                <Icon name="Pencil" size={36} className="text-primary" />
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-light text-primary">02</div>
                <h3 className="text-lg font-light">Разработка чертежей</h3>
                <p className="text-sm text-muted-foreground">
                  Создаём детальные эскизы и 3D-визуализацию
                </p>
              </div>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.2 }} className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 flex items-center justify-center mx-auto rounded-full">
                <Icon name="FileCheck" size={36} className="text-primary" />
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-light text-primary">03</div>
                <h3 className="text-lg font-light">Согласование</h3>
                <p className="text-sm text-muted-foreground">
                  Утверждаем проект и все детали с клиентом
                </p>
              </div>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.3 }} className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 flex items-center justify-center mx-auto rounded-full">
                <Icon name="Wrench" size={36} className="text-primary" />
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-light text-primary">04</div>
                <h3 className="text-lg font-light">Производство</h3>
                <p className="text-sm text-muted-foreground">
                  Изготавливаем изделие на собственном производстве
                </p>
              </div>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.4 }} className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 flex items-center justify-center mx-auto rounded-full">
                <Icon name="Truck" size={36} className="text-primary" />
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-light text-primary">05</div>
                <h3 className="text-lg font-light">Доставка</h3>
                <p className="text-sm text-muted-foreground">
                  Доставляем и устанавливаем изделие на объекте
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-light mb-4">Отзывы клиентов</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Нам доверяют те, кто ценит качество и индивидуальный подход
            </p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={staggerItem} transition={{ delay: 0 }}>
              <Card className="p-8 space-y-4 border-0 shadow-sm h-full">
                <div className="flex gap-1 mb-2">
                  <Icon name="Star" size={20} className="text-primary fill-primary" />
                  <Icon name="Star" size={20} className="text-primary fill-primary" />
                  <Icon name="Star" size={20} className="text-primary fill-primary" />
                  <Icon name="Star" size={20} className="text-primary fill-primary" />
                  <Icon name="Star" size={20} className="text-primary fill-primary" />
                </div>
                <p className="text-muted-foreground leading-relaxed italic">
                  "Заказывали декоративные панели для гостиной. Работа выполнена безупречно — каждая деталь продумана. Качество металла и обработки на высшем уровне. Рекомендую!"
                </p>
                <div className="pt-4 border-t">
                  <p className="font-light">Анна Сергеева</p>
                  <p className="text-sm text-muted-foreground">Владелец квартиры в ЖК "Символ"</p>
                </div>
              </Card>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.1 }}>
              <Card className="p-8 space-y-4 border-0 shadow-sm h-full">
                <div className="flex gap-1 mb-2">
                  <Icon name="Star" size={20} className="text-primary fill-primary" />
                  <Icon name="Star" size={20} className="text-primary fill-primary" />
                  <Icon name="Star" size={20} className="text-primary fill-primary" />
                  <Icon name="Star" size={20} className="text-primary fill-primary" />
                  <Icon name="Star" size={20} className="text-primary fill-primary" />
                </div>
                <p className="text-muted-foreground leading-relaxed italic">
                  "Сотрудничали при оформлении ресторана. Ребята сделали лестничное ограждение и барную стойку из латуни. Получилось стильно и дорого. Гости постоянно спрашивают, кто делал."
                </p>
                <div className="pt-4 border-t">
                  <p className="font-light">Дмитрий Ковалёв</p>
                  <p className="text-sm text-muted-foreground">Владелец ресторана "Gatsby"</p>
                </div>
              </Card>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.2 }}>
              <Card className="p-8 space-y-4 border-0 shadow-sm h-full">
                <div className="flex gap-1 mb-2">
                  <Icon name="Star" size={20} className="text-primary fill-primary" />
                  <Icon name="Star" size={20} className="text-primary fill-primary" />
                  <Icon name="Star" size={20} className="text-primary fill-primary" />
                  <Icon name="Star" size={20} className="text-primary fill-primary" />
                  <Icon name="Star" size={20} className="text-primary fill-primary" />
                </div>
                <p className="text-muted-foreground leading-relaxed italic">
                  "Обратились с нестандартной задачей — нужна была садовая беседка с ажурными элементами. MHKS Steel воплотили нашу идею в жизнь. Работают быстро, профессионально, с душой."
                </p>
                <div className="pt-4 border-t">
                  <p className="font-light">Елена Васильева</p>
                  <p className="text-sm text-muted-foreground">Дизайнер интерьеров</p>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section 
        className="py-20 px-6 bg-secondary text-secondary-foreground"
        {...fadeInUp}
      >
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-4xl font-light">Индивидуальный подход</h2>
          <p className="text-lg leading-relaxed opacity-90">
            Каждое изделие разрабатывается по эскизам клиента с учётом особенностей интерьера.<br />
            Мы воплощаем в металле самые сложные дизайнерские идеи
          </p>
          <Button size="lg" variant="outline" className="bg-transparent border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary mt-6" onClick={() => {
            const contactSection = document.getElementById('contact');
            contactSection?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Обсудить ваш проект
          </Button>
        </div>
      </motion.section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-light mb-4">Почему выбирают нас</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              К каждому клиенту относимся как к VIP — создаём изделия премиум-класса для вас
            </p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={staggerItem} transition={{ delay: 0 }} className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Award" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-light">15+ лет опыта</h3>
              <p className="text-sm text-muted-foreground">
                Работаем с металлом с 2009 года и реализовали более 500 проектов
              </p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.1 }} className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-light">Гарантия качества</h3>
              <p className="text-sm text-muted-foreground">
                Используем только премиальные материалы и даём гарантию на все работы
              </p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.2 }} className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-light">Индивидуальный подход</h3>
              <p className="text-sm text-muted-foreground">
                Каждый проект уникален — работаем по эскизам клиента
              </p>
            </motion.div>
            <motion.div variants={staggerItem} transition={{ delay: 0.3 }} className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-light">Точные сроки</h3>
              <p className="text-sm text-muted-foreground">
                Соблюдаем договорённости и сдаём проекты вовремя
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            className="text-center mb-12"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-light mb-4">Свяжитесь с нами</h2>
            <p className="text-muted-foreground">
              Расскажите о вашем проекте, и мы предложим решение
            </p>
          </motion.div>
          <motion.form 
            className="space-y-6 max-w-xl mx-auto"
            onSubmit={handleSubmit}
            {...fadeInUp}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm tracking-wide">Имя *</label>
                <input 
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-card border border-input focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Ваше имя"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm tracking-wide">Телефон *</label>
                <InputMask
                  mask="+7 (999) 999-99-99"
                  name="phone"
                  required
                  className="w-full px-4 py-3 bg-card border border-input focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm tracking-wide">Email</label>
              <input 
                type="email"
                name="email"
                className="w-full px-4 py-3 bg-card border border-input focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm tracking-wide">Описание проекта</label>
              <textarea 
                rows={4}
                name="message"
                className="w-full px-4 py-3 bg-card border border-input focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Расскажите о вашем проекте"
              />
            </div>
            <Button size="lg" type="submit" disabled={isSubmitting} className="w-full font-light tracking-wide">
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </Button>
          </motion.form>
        </div>
      </section>

      <section className="py-16 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="space-y-8 text-sm text-muted-foreground leading-relaxed"
            {...fadeInUp}
          >
            <div>
              <h2 className="text-2xl font-light text-foreground mb-4">Изготовление изделий из металла в Екатеринбурге</h2>
              <p className="mb-4">
                Компания MHKS Steel специализируется на производстве металлических изделий и мебели на заказ в Екатеринбурге. 
                Мы работаем с латунью, нержавеющей сталью, бронзой, медью и другими металлами. Наше производство 
                оснащено современным оборудованием для обработки металла любой сложности.
              </p>
              <p>
                Изготавливаем металлическую мебель для дома и офиса: столы из металла, стулья, стеллажи из металла, 
                полки из нержавейки. Выполняем изделия из латуни премиум-класса, декоративные панели из металла, 
                лестничные ограждения из нержавейки, перила, декоративные экраны и перегородки.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-light text-foreground mb-3">Наши услуги по металлообработке</h3>
              <p className="mb-3">
                Металлоконструкции на заказ для жилых и коммерческих помещений. Сварочные работы любой сложности, 
                художественная ковка металла, гибка, резка, полировка. Изделия из нержавейки для кухонь и ванных комнат.
              </p>
              <p>
                Изготовление металлических изделий для интерьера: журнальные столики из металла, мебель из стали и дерева, 
                стеллажи из металла в стиле лофт, кованые элементы декора. Производство металлоизделий премиум-класса 
                с индивидуальным дизайном.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-light text-foreground mb-3">Обработка металла и материалы</h3>
              <p>
                Работаем с латунью, нержавеющей сталью (нержавейкой), бронзой, медью, чёрной сталью. Выполняем ковку металла, 
                сварочные работы, резку, гибку, шлифовку, полировку до зеркального блеска. Изделия из латуни с патинированием, 
                изделия из нержавейки с матовой или глянцевой поверхностью. Покраска металлических изделий порошковой краской 
                в любой цвет по RAL. 15+ лет опыта работы с металлом.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Logo className="mb-4" />
              <p className="text-sm text-muted-foreground">
                Изготовление металлических изделий и мебели из латуни, нержавейки, стали на заказ в Екатеринбурге
              </p>
            </div>
            <div>
              <h4 className="font-light mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>+7 (967) 777-14-11</p>
                <p>paul05.93@mail.ru</p>
                <p>г. Екатеринбург, ул. Щербакова, 150</p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 MHKS Steel. Все права защищены</p>
          </div>
        </div>
      </footer>

      <a 
        href="https://wa.me/79677771411"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20BA5A] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-50"
        aria-label="Написать в WhatsApp"
      >
        <Icon name="MessageCircle" size={28} />
      </a>
    </div>
  );
};

export default Index;