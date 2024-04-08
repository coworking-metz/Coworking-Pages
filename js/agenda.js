// document.addEventListener('DOMContentLoaded', () => {
(() => {
    chargerEvents();
    document.body.addEventListener('click', chargerEvents)
    function chargerEvents() {
        fetch('https://tickets.coworking-metz.fr/api/calendar/events?key=bupNanriCit1').then(response => response.json()).then(events => {
            events = events.filter(event => event.calendar == 'COWORKING' && isDateInFuture(event.start));
            afficherEvents([events[Math.floor(Math.random() * events.length)]]);
        })
    }
    function afficherEvents(events) {
        const html = []
        events.forEach(event => {
            html.push(afficherEvent(event))
        })
        document.querySelector('.events').innerHTML = html.join('');
    }


    function afficherEvent(event) {
        console.log(event);
        const template = `
    <div class="card">
        <div class="card-image">
            <figure class="image">
                <img src="${event.pictures[0] || ''}" />
            </figure>
        </div>
        <div class="card-content">
            <div class="media">

                <div class="media-content">
                    <p class="title is-4">${event.title}</p>
                    <p class="subtitle is-6">${formatDateToFrench(event.start)}</p>
                </div>
            </div>

            <div class="content">${event.description}</div>
        </div>
    </div>`;

        return template;
    }
    // })
})();