import './style.css'

document.querySelector('#app').innerHTML = `
<div class="crm-shell">
  <header class="topbar">
    <div class="brand">
      <span class="brand-mark" aria-hidden="true"></span>
      <div>
        <p class="eyebrow">Tu CRM</p>
        <h1>Panel Comercial</h1>
      </div>
    </div>
    <button class="quick-action" type="button">+ Nuevo lead</button>
  </header>

  <section class="kpis" aria-label="Resumen">
    <article class="kpi-card">
      <p>Pipeline activo</p>
      <strong>€ 148.900</strong>
      <span>+14% este mes</span>
    </article>
    <article class="kpi-card">
      <p>Leads nuevos</p>
      <strong>37</strong>
      <span>9 sin contactar</span>
    </article>
    <article class="kpi-card">
      <p>Conversiones</p>
      <strong>28%</strong>
      <span>Objetivo: 30%</span>
    </article>
  </section>

  <main class="main-grid">
    <section class="panel board" aria-label="Funnel de ventas">
      <div class="panel-head">
        <h2>Funnel de hoy</h2>
        <button type="button">Ver informe</button>
      </div>
      <div class="stages">
        <div class="stage">
          <h3>Prospección</h3>
          <p>12 contactos</p>
          <strong>€ 46.300</strong>
        </div>
        <div class="stage">
          <h3>Demo</h3>
          <p>8 oportunidades</p>
          <strong>€ 59.200</strong>
        </div>
        <div class="stage">
          <h3>Negociación</h3>
          <p>4 cuentas</p>
          <strong>€ 43.400</strong>
        </div>
      </div>
    </section>

    <section class="panel tasks" aria-label="Agenda comercial">
      <div class="panel-head">
        <h2>Agenda</h2>
        <button type="button">Filtrar</button>
      </div>
      <ul>
        <li>
          <div>
            <strong>11:00 - Reunión con Hotel Sol</strong>
            <p>Renovación anual · MRR € 2.400</p>
          </div>
          <span class="chip hot">Urgente</span>
        </li>
        <li>
          <div>
            <strong>13:30 - Llamada con Clínica Norte</strong>
            <p>Presentación de propuesta enterprise</p>
          </div>
          <span class="chip">Seguimiento</span>
        </li>
        <li>
          <div>
            <strong>17:15 - Demo con GreenFoods</strong>
            <p>2 decisores confirmados</p>
          </div>
          <span class="chip">Demo</span>
        </li>
      </ul>
    </section>

    <section class="panel table-panel" aria-label="Clientes">
      <div class="panel-head">
        <h2>Cartera de clientes</h2>
        <button type="button">Exportar</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Cuenta</th>
              <th>Estado</th>
              <th>Responsable</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Blue Horizon</td>
              <td><span class="status ok">Activa</span></td>
              <td>Clara R.</td>
              <td>€ 18.200</td>
            </tr>
            <tr>
              <td>Optimed Labs</td>
              <td><span class="status warn">Riesgo</span></td>
              <td>Iker M.</td>
              <td>€ 7.800</td>
            </tr>
            <tr>
              <td>Costa Homes</td>
              <td><span class="status ok">Activa</span></td>
              <td>Paula S.</td>
              <td>€ 12.600</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>

  <nav class="mobile-nav" aria-label="Navegación rápida">
    <button type="button" class="active">Inicio</button>
    <button type="button">Pipeline</button>
    <button type="button">Agenda</button>
    <button type="button">Clientes</button>
  </nav>
  </div>
`
