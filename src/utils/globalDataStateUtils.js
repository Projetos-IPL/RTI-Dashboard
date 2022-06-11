/**
 * Função para criar um novo evento
 * @param dataEntity Entidade do evento
 * @param setDataStateEvent setter do state
 */
export function createDataStateEvent(
  dataEntity: string,
  setDataStateEvent: function
): void {
  setDataStateEvent({ dataEntity, timestamp: Date.now() });
}
