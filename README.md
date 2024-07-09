Frontend

Na frontendu, pored grafičkog interfejsa za upravljanje korisnicima iz domaćeg 3, potrebno je implementirati tri nove stranice: 
- Stranicu za pretragu usisivača
- Stranicu za dodavanje usisivača
- Stranicu sa istorijom grešaka

1. Pretraga usisivača:

Implementirati da se upotrebom SEARCH akcije prikažu svi usisivači, bez prosleđenih parametara kada se stranica učita. Pored toga, potrebno je implemenitari formu iznad tabele koja sadrži potrebna polja da pokrije sve funkcionalnosti za pretragu koje nudi Backend. Filteri će se primeniti submitom te forme.

2. Dodavanje usisivača

Napraviti jednostavnu formu koja će sadržati ime koje je potrebno da bi se usisivač dodao u sistem na Backend strani. Ova forma neće sadržati id, status, niti korisnika, to će Backend zaključiti sam.

3. Stranica sa istorijom grešaka

Tabela u kojoj je potrebno prikazati greške koje su se dogodile pri izvršavanju zakazane operacije. Potrebno je prikazati samo greške koje su se dogodile nad usisivačima ulogovanog korisnika.

Korisnik bez specifične permisije nema pristup, ni mogućnost za izvršavanja odgovarajuće akcije na frontend-u. 

Ukoliko korisnik nema nijednu permisiju, nakon uspešnog login-a, obavestiti ga alertom.
