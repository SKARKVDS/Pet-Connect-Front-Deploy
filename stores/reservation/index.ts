import {defineStore} from "pinia";
import { ref } from "vue";
import type {APIResponse} from "~/services/types";
import {API} from "~/services";
import type {AxiosError} from "axios";
import type {Sex} from "~/services/sex/types";
import type { ReservationDashboard, ReservationRequest , ReservationProposal} from "~/services/reservation/types";

export const useReservationStore = defineStore('reservation', () => {
  const reservationsRequestDashboard = ref<ReservationDashboard[]>([]);
  const reservationsProposalDashboard = ref<ReservationDashboard[]>([]);

  const reservationsMemoryRequestDashboard = ref<ReservationDashboard[]>([]);
  const reservationsMemoryProposalDashboard = ref<ReservationDashboard[]>([]);

  const reservationRequest = ref<ReservationRequest>()
  const reservationProposal = ref<ReservationProposal>()


  function initReservationsRequestDashboard(data: ReservationDashboard[]) {
    reservationsRequestDashboard.value = data;
  }

  function initReservationsProposalDashboard(data: ReservationDashboard[]) {
    reservationsProposalDashboard.value = data;
  }

  function initReservationsMemoryRequestDashboard(data: ReservationDashboard[]) {
    reservationsMemoryRequestDashboard.value = data;
  }

  function initReservationsMemoryProposalDashboard(data: ReservationDashboard[]) {
    reservationsMemoryProposalDashboard.value = data;
  }

  function initReservationRequest(data: ReservationRequest) {
    reservationRequest.value = data;
  }

  function initReservationProposal(data: ReservationProposal) {
    reservationProposal.value = data;
  }

  async function dispatchGetAllProposalByToken(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.reservations.getAllProposalByToken();
      if (status === 200) {
        initReservationsProposalDashboard(data.content);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      console.log(error)
      const _error = error as AxiosError<string>;
      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    }
    return {
      success: false,
      content: null,
      status: 400,
    };
  }

  async function dispatchGetAllRequestByToken(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.reservations.getAllRequestByToken();
      if (status === 200) {
        initReservationsRequestDashboard(data.content);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      console.log(error)
      const _error = error as AxiosError<string>;
      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    }
    return {
      success: false,
      content: null,
      status: 400,
    };
  }

  async function dispatchGetAllMemoryProposalByToken(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.reservations.getAllMemoryProposalByToken();
      if (status === 200) {
        initReservationsMemoryProposalDashboard(data.content);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      console.log(error)
      const _error = error as AxiosError<string>;
      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    }
    return {
      success: false,
      content: null,
      status: 400,
    };
  }

  async function dispatchGetAllMemoryRequestByToken(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.reservations.getAllMemoryRequestByToken();
      if (status === 200) {
        initReservationsMemoryRequestDashboard(data.content);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      console.log(error)
      const _error = error as AxiosError<string>;
      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    }
    return {
      success: false,
      content: null,
      status: 400,
    };
  }

  async function dispatchGetRequestById(id: number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.reservations.getRequestById(id);
      if (status === 200) {
        initReservationRequest(data.content);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      console.log(error)
      const _error = error as AxiosError<string>;
      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    }
    return {
      success: false,
      content: null,
      status: 400,
    };
  }

  async function dispatchGetProposalById(id: number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.reservations.getProposalById(id);
      if (status === 200) {
        initReservationProposal(data.content);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      console.log(error)
      const _error = error as AxiosError<string>;
      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    }
    return {
      success: false,
      content: null,
      status: 400,
    };
  }

  async function dispatchFinish(id: number): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.reservations.finishReservation(id);
      if (status === 200) {
        initReservationRequest(data.content);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      console.log(error)
      const _error = error as AxiosError<string>;
      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    }
    return {
      success: false,
      content: null,
      status: 400,
    };
  }

  return { reservationsProposalDashboard, reservationsRequestDashboard, reservationRequest, reservationProposal, reservationsMemoryRequestDashboard, reservationsMemoryProposalDashboard,
    dispatchGetAllMemoryRequestByToken, dispatchGetAllMemoryProposalByToken,
    dispatchGetAllProposalByToken, dispatchGetAllRequestByToken,
    dispatchGetRequestById, dispatchGetProposalById,
    dispatchFinish }
})