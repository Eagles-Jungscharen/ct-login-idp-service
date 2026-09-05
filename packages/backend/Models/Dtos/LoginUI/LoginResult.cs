using System.Text.Json.Serialization;
using EaglesJungscharen.CT.IDP.Models.ChurchTools;
namespace EaglesJungscharen.CT.IDP.Models.Dtos.LoginUI;

public class LoginResult
{
    [JsonPropertyName("callback")]
    public string Callback { get; set; } = string.Empty;
}
