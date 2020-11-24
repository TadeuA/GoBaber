import Appointment from '../models/Appointment'
import {startOfHour} from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  date: Date;
  provider: string;
}


class CreateAppointmentService{
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository){
    this.appointmentsRepository = appointmentsRepository;
  }


  public execute({date, provider}: RequestDTO): Appointment{
    const appointmentData = startOfHour(date);

    const findAppointmentsInSameDate = this.appointmentsRepository.findByDate(
      appointmentData
    );


    if(findAppointmentsInSameDate){
      throw Error('This appointment is already booked')
    }

    const appointment = this.appointmentsRepository
      .create({
        provider,
        date: appointmentData
      })

      return appointment
  }
}

export default CreateAppointmentService
