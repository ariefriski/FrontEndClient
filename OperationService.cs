namespace BelajarWeb1
{
    public class OperationService : IScopedService, ITransientService, ISingletonService
    {
        Guid id;

        public OperationService()
        {
            id = Guid.NewGuid();
        }

        public Guid GetOperationID()
        {
            return id;
        }
    }
}
