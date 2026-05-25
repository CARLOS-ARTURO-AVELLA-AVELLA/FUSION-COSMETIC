import { useNavigate } from 'react-router-dom'

const marcas = [
  "Chanel", "Dior", "Lancôme", "Yves Saint Laurent", "Giorgio Armani",
  "Versace", "Calvin Klein", "Hugo Boss", "Paco Rabanne", "Carolina Herrera",
  "Gucci", "Burberry", "Dolce & Gabbana", "Givenchy", "Narciso Rodriguez",
  "Viktor & Rolf", "Jean Paul Gaultier", "Mugler", "Valentino", "Tom Ford",
]

const WHATSAPP_NUMERO = "573223047472"

export default function CasasPerfumistas() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">

        {/* Eyebrow */}
        <span
          style={{
            display: 'inline-block',
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: '#085041',
            textTransform: 'uppercase',
            fontWeight: 500,
            background: '#E1F5EE',
            border: '1px solid #1D9E75',
            borderRadius: '8px',
            padding: '4px 14px',
            marginBottom: '1rem',
          }}
        >
          Catálogo abierto
        </span>

        {/* Título */}
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '28px',
            fontWeight: 700,
            color: '#1a2e4a',
            margin: '0 0 0.75rem',
          }}
        >
          ¿No encuentras tu fragancia favorita?
        </h2>

        {/* Subtítulo */}
        <p
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '16px',
            fontWeight: 500,
            color: '#1a2e4a',
            maxWidth: '460px',
            margin: '0 auto 2rem',
            lineHeight: 1.8,
            textAlign: 'center',
          }}
        >
          Trabajamos con las principales casas perfumistas del mundo.
          Si no ves lo que buscas, pregúntanos — tenemos acceso a cientos de referencias.
        </p>

        {/* Píldoras de marcas */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
            marginBottom: '2rem',
            maxWidth: '620px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {marcas.map((marca) => (
            <span
              key={marca}
              style={{
                padding: '7px 18px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 500,
                background: 'linear-gradient(90deg, #E1F5EE, #FAEEDA)',
                color: '#3a2a00',
                border: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {marca}
            </span>
          ))}
        </div>

        {/* Divisor "y muchas más" */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            maxWidth: '480px',
            margin: '0 auto 2rem',
          }}
        >
          <div style={{ flex: 1, height: '1.5px', background: '#1D9E75', opacity: 0.5 }} />
          <span
            style={{
              fontSize: '15px',
              fontWeight: 500,
              padding: '4px 14px',
              border: '1.5px solid #1D9E75',
              borderRadius: '20px',
              background: '#E1F5EE',
              color: '#085041',
            }}
          >
            y muchas más
          </span>
          <div style={{ flex: 1, height: '1.5px', background: '#1D9E75', opacity: 0.5 }} />
        </div>

        {/* CTA WhatsApp */}
        <div
          style={{
            background: '#0f172a',
            borderRadius: '12px',
            padding: '1.75rem 1.5rem',
            maxWidth: '480px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Acento decorativo */}
          <div
            style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: '#1D9E75',
              opacity: 0.12,
            }}
          />

          <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '17px', fontWeight: 700, color: '#FAC775', margin: '0 0 0.5rem' }}>
            ¿No encuentras lo que buscas?
          </p>
          <p style={{ fontSize: '14px', color: '#9FE1CB', margin: '0 0 1.25rem', lineHeight: 1.7 }}>
            Escríbenos por WhatsApp y con gusto buscamos tu fragancia. Te respondemos en minutos.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMERO}?text=Hola!%20Estoy%20buscando%20una%20fragancia%20que%20no%20encuentro%20en%20su%20cat%C3%A1logo`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#1D9E75',
              color: '#fff',
              borderRadius: '24px',
              padding: '12px 28px',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Consultar por WhatsApp
          </a>
          <p style={{ marginTop: '1rem', fontSize: '13px', color: '#ffffff', fontWeight: 500 }}>
            Lunes a sábado · 8am – 7pm
          </p>
        </div>

      </div>
    </section>
  )
}