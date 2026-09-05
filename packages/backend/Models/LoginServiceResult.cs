using EaglesJungscharen.CT.IDP.Models.ChurchTools;
namespace EaglesJungscharen.CT.IDP.Models; 


public class LoginServiceResult
{
    public CTLoginTokenResponse? CTLoginResponse { get; set; }
    public bool Error { get; set; }
    public string? ErrorMessage { get; set; }
}
