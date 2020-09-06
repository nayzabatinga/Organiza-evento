import fs from 'fs'
import moment from 'moment'

class EventoController {
    async organizandoEvento(req,res){
        const { filename } = (req.body,req.file)
        const file = fs.readFileSync(`src/uploads/${filename}`, 'utf-8')
        const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        var palestras = file.split(/[\n|\n\r]/)
        var letra = 0
        var tracks = { Track_A:[] }
        var hora = 9
        var minuto = 0

        palestras.forEach( item => {
            if(item.substr(-3) != 'min'){
                palestras[palestras.indexOf(item)] = ""
                palestras[palestras.length - 1] = `${item} 60min` 
            }        
        })
        for(let palestra of palestras){
            if(palestra.length > 0){
                let conteudo = {}
                let intervalo = {}
                let terminoPalestra = moment().hours(hora).minutes(minuto).second(0).add(Number(palestra.substr(-5, 2)), 'm')
                let interrupcao = ''

                if(terminoPalestra.hour() == 12 && terminoPalestra.minute() > 0) interrupcao = 'Almoço'
                if(terminoPalestra.hour() == 17 && terminoPalestra.minute() > 0) interrupcao = 'Evento de networking'
                
                if(interrupcao.length > 0){
                    console.log(terminoPalestra.hour(),terminoPalestra.minute(), palestra)
                    if(terminoPalestra.minute() == Number(palestra.substr(-5, 2))){
                        intervalo.horario =`${hora}:0`
                        intervalo.titulo = interrupcao
                        intervalo.duracao = 60
                        console.log(intervalo)
                        tracks[`Track_${alfabeto[letra]}`].push(intervalo)
                        if(interrupcao != 'Almoço'){
                            letra++
                            tracks[`Track_${alfabeto[letra]}`] = []
                            hora = 9
                        }else
                            hora = 13
                        minuto = 0
                        
                    }else{
                        let diferenca = moment().hours((interrupcao == 'Almoço') ? 12 : 17).minutes(0).second(0).subtract({ hours: hora, minutes: minuto})
                        for(let i = palestras.indexOf(palestra); i < palestras.length; i++){
                            console.log(diferenca.minutes())
                            console.log(palestras[i])
                            if(palestras[i].substr(-5, 2) <= diferenca.minutes()){
                                intervalo.horario = `${hora}:${minuto}`
                                intervalo.titulo = palestras[i].substr(0, (palestras[i].length -5))
                                intervalo.duracao = Number(palestras[i].substr(-5, 2))
                                console.log(intervalo)
                                tracks[`Track_${alfabeto[letra]}`].push(intervalo)
                            }
                            intervalo.horario =`${hora}:0`
                            intervalo.titulo = interrupcao
                            intervalo.duracao = 60
                            console.log(intervalo)
                            tracks[`Track_${alfabeto[letra]}`].push(intervalo)
                            if(interrupcao != 'Almoço'){
                                letra++
                                tracks[`Track_${alfabeto[letra]}`] = []
                                hora = 9
                            }else
                                hora = 13
                            minuto = 0
                            break
                        }
                    }
                }
                let horario = moment().hours(hora).minutes(minuto).second(0).add(Number(palestra.substr(-5, 2)), 'm')
                conteudo.horario = `${hora}:${minuto}`
                conteudo.titulo = palestra.substr(0, (palestra.length -5))
                conteudo.duracao = Number(palestra.substr(-5, 2))
                tracks[`Track_${alfabeto[letra]}`].push(conteudo)
                hora = horario.hour()
                minuto = horario.minute()
            }
        }
        return res.json(tracks)
    }
}
export default new EventoController();