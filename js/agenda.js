// document.addEventListener('DOMContentLoaded', () => {
(() => {
    chargerEvents();
    document.body.addEventListener('click', chargerEvents)
    function chargerEvents() {
        fetch('https://tickets.coworking-metz.fr/api/calendar/events?key=bupNanriCit1').then(response => response.json()).then(allEvents => {
            let events = allEvents.filter(event => event.calendar == 'COWORKING' && isDateInFuture(event.start) && isDateNear(event.start));
            if (events.length == 0) {
                events = allEvents.filter(event => event.calendar == 'COWORKING' && isDateInFuture(event.start));
            }
            events = events.filter(event => !event.title.includes('Nettoyage collectif du coworking'));
            events = filterUniqueEventsByTitle(events)
            const selectedEvents = getRandomElements(events, 3);

            afficherEvents(selectedEvents
                .sort((a, b) => new Date(a.start) - new Date(b.start))

            );
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
        const template = `
    <div class="event">
            <figure>
                <img src="${event.pictures[0] || ''}" />
                <h2>${event.title}</h2>
            </figure>
            <div class="content">
            <time>${formatDateToFrench(event.start)}</time>
            <address>${event.location || ''}</address>
                    <p>${truncateToFirstSentence(event.description)}</p>
            </div>
        </div>
    </div>`;

        return template;
    }

    function filterUniqueEventsByTitle(events) {
        const uniqueTitles = new Set();
        return events.filter(event => {
            if (!uniqueTitles.has(event.title)) {
                uniqueTitles.add(event.title);
                return true;
            }
            return false;
        });
    }

})();