import alt from '../alt';

class HomeActions {
    constructor() {
        this.generateActions(
            'getTwoCharactersSuccess',
            'getTwoCharactersFail',
            'voteFail' // Don't need voteSuccess because getTwoCharacters already refreshes the two characters
        );
    }

    getTwoCharacters() {
        $.ajax({ url: '/api/characters' })
        .done(data => {
            this.actions.getTwoCharactersSuccess(data);
        })
        .fail(jqXhr => {
            this.actions.getTwoCharactersFail(jqXhr.responseJSON.message);
        });
    }

    vote(winner, loser) {
        $.ajax({
            type: 'PUT',
            url: '/api/characters',
            data: { winner: winner, loser: loser }
        })
        .done(() => {
            this.actions.getTwoCharacters(); // Fetches two more characters from the database
        })
        .fail(jqXhr => {
            this.actions.voteFail(jqXhr.responseJSON.message);
        });
    }
}

export default alt.createActions(HomeActions);