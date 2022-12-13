//import { ContactForm } from './ContactForm';
import { Section } from './Section';

export function Footer() {
  return (
    <footer className="bg-dark pt-12 text-light">
      <Section.Container>
        {/* <Section.Title>Contactez-nous</Section.Title>
        <div id="contact" className="grid grid-cols-2 gap-12">
          <ContactForm />
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/benjamin-boileux"
            data-auto-load="true"
          ></div>
        </div> */}
        <div className="flex h-20 items-center">
          <p>ocobo &copy; 2022</p>
        </div>
      </Section.Container>
    </footer>
  );
}
