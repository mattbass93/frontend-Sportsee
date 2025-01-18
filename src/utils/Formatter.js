export default class Formatter {

    static formatDay(dateString) {
        const date = new Date(dateString);
        return date.getDate();
    }

    static formatDayOfWeek(dayIndex) {
        const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
        return days[dayIndex - 1] || '';
    }



    static translateAndOrderKinds(data) {
        const kindTranslation = {
            cardio: 'Cardio',
            energy: 'Énergie',
            endurance: 'Endurance',
            strength: 'Force',
            speed: 'Vitesse',
            intensity: 'Intensité',
        };

        const desiredOrder = ['Intensité', 'Vitesse', 'Force', 'Endurance', 'Énergie', 'Cardio'];

        return data
            .map((item) => ({
                ...item,
                kind: kindTranslation[item.kind] || item.kind,
            }))
            .sort((a, b) => desiredOrder.indexOf(a.kind) - desiredOrder.indexOf(b.kind));
    }
}

